open Utils;

let component = ReasonReact.statelessComponent("Sign");

let make = (~register, _children) => {
  ...component,
  render: _self =>
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              ((register ? "Sign up" : "Sign in") |> strEl)
            </h1>
            <p className="text-xs-center">
              (
                register ?
                  <a href="/#/login"> ("Have an account?" |> strEl) </a> :
                  <a href="/#/register"> ("Need an account?" |> strEl) </a>
              )
            </p>
            <ul className="error-messages">
              <li> ("That email is already taken" |> strEl) </li>
            </ul>
            <form>
              (
                register ?
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      _type="text"
                      placeholder="Your Name"
                    />
                  </fieldset> :
                  nullEl
              )
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  _type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  _type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                ((register ? "Sign up" : "Sign in") |> strEl)
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>,
};
