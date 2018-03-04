import React from 'react';
import { connect } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../routes';
import { getStore } from '../../redux/store'
import { login, logout, signup, clearErrors } from '../../redux/services/user';
import ErrorsList from '../components/errorsList';

class Login extends React.PureComponent {
  static async getInitialProps({ req, res, dispatch, match }) {
    if (match.params[0] === 'sign-out') {
      if (req) { // on SSR
        res.cookie('token', '', { signed: false });
      } else { // on CSR
        await dispatch(logout());
      }
    }
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.props.dispatch(clearErrors());
    if (this.props.history.action === 'POP') {
      await Login.getInitialProps(this.props);
    }
    if (this.props.match.params[0] === 'sign-out') {
      this.props.history.replace('/sign-in');
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.props.user && this.props.user.transition) {
      return;
    }
    if (this.isSignUp()) {
      await this.props.dispatch(signup({
        username: this.usernameInput.value,
        email: this.emailInput.value,
        password: this.passwordInput.value,
      }));
    } else {
      await this.props.dispatch(login({
        email: this.emailInput.value,
        password: this.passwordInput.value,
      }));
    }
    if (!this.props.user || !this.props.user.id) {
      return;
    }
    this.passwordInput.value = '';
    const routeTo = routes.find((route) =>
      matchPath('/feed', route) ? route : null
    );
    const match = matchPath('/feed', routeTo);
    const store = getStore();
    import(`./home`) // eslint-disable-line
      .then(component => component.default || component)
      .then(component => component.getInitialProps({
        match,
        store,
        dispatch: store.dispatch
      }))
      .then(() => this.props.history.replace('/feed'));

  }

  isSignUp() {
    return this.props.match && this.props.match.params && this.props.match.params[0] === 'sign-up';
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">
                {
                  this.isSignUp()
                    ? 'Sign up'
                    : 'Sign in'
                }
              </h1>
              <p className="text-xs-center">
                {
                  this.isSignUp()
                    ? <Link to="/sign-in">Have an account?</Link>
                    : <Link to="/sign-up">Need an account?</Link>
                }
              </p>
              <ErrorsList error={this.props.user.error} />
              <form onSubmit={this.handleSubmit}>
                {
                  this.isSignUp()
                    ?
                      <fieldset className="form-group">
                        <input
                          ref={(input) => { this.usernameInput = input; }}
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Your Name"
                          autoComplete="off"
                        />
                      </fieldset>
                    :
                      null
                }
                <fieldset className="form-group">
                  <input
                    ref={(input) => { this.emailInput = input; }}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    autoComplete="off"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    ref={(input) => { this.passwordInput = input; }}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  {
                    this.isSignUp()
                      ? 'Sign up'
                      : 'Sign in'
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    error: PropTypes.object,
    transition: PropTypes.bool,
  }).isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

export default connect(state => ({ user: state.user, hydrated: state.hydrated }))(Login);
