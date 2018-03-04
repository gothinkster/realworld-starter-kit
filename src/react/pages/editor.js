import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { me } from '../../redux/services/user';
import { article, comments, saveArticle } from '../../redux/services/article';


class Editor extends React.PureComponent {
  static async getInitialProps({ req, dispatch, user, match }) {
    const promises = [];
    if (req && !user) {
      promises.unshift(dispatch(me({ req })));
    }
    const { slug } = match.params;
    if (slug) {
      promises.push(dispatch(article({ req, slug })));
    }
    await Promise.all(promises);
  }

  constructor(...args) {
    super(...args);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    if (this.props.match.params.slug) {
      this.state = {
        title: '',
        description: '',
        body: '',
        tagList: '',
        ...this.props.article.article,
      };
      if (this.props.article.article) {
        this.state.tagList = this.props.article.article.tagList.join(', ');
      }
    } else {
      this.state = {
        title: '',
        description: '',
        body: '',
        tagList: '',
      };
    }
  }

  async componentDidMount() {
    if (this.props.history.action === 'POP' && this.props.hydrated) {
      await Editor.getInitialProps(this.props);
    }
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.props.article.transition) {
      return;
    }
    const articleToSave = { ...this.state };
    let { slug } = this.props.match.params;
    await this.props.dispatch(saveArticle({
      ...articleToSave,
      slug,
      tagList: articleToSave.tagList.split(/\s*,\s*/),
    }));
    if (!this.props.article.error) {
      ({ slug } = this.props.article.article);
      const promises = [
        this.props.dispatch(article({ slug })),
        this.props.dispatch(comments({ slug })),
      ];
      await Promise.all(promises);
      if (!this.props.article.error) {
        this.props.history.replace(`/${slug}`);
      }
    }
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={this.handleSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      name="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      name="body"
                      onChange={this.handleChange}
                      value={this.state.body}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      name="tagList"
                      onChange={this.handleChange}
                      value={this.state.tagList}
                    />
                    <div className="tag-list" />
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                      Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hydrated: PropTypes.bool.isRequired,
  match: PropTypes.shape().isRequired,
  article: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(state => ({
  user: state.user,
  hydrated: state.hydrated,
  article: state.article,
}))(Editor);
