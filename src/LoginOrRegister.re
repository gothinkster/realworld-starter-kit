[@react.component]
let make = () => {
  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center"> "Sign up"->React.string </h1>
          <p className="text-xs-center">
            <a href=""> "Have an account?"->React.string </a>
          </p>
          <ul className="error-messages">
            <li> "That email is already taken"->React.string </li>
          </ul>
          <form>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type_="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type_="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type_="password"
                placeholder="Password"
              />
            </fieldset>
            <button className="btn btn-lg btn-primary pull-xs-right">
              "Sign up"->React.string
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>;
};
