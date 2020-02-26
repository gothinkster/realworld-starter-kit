open Relude.Globals;

[@react.component]
let make = (~user: Shape.User.t) => {
  <div className="settings-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center"> "Your Settings"->React.string </h1>
          <form>
            <fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control"
                  type_="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  rows=8
                  placeholder="Short bio about you"
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
                "Update Settings"->React.string
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>;
};
