open Utils;

let component = ReasonReact.statelessComponent("FormBody");

let make =
    (
      ~username,
      ~onUsernameChange,
      ~onUsernameBlur,
      ~email,
      ~onEmailChange,
      ~onEmailBlur,
      ~password,
      ~onPasswordChange,
      ~onPasswordBlur,
      ~onSubmit,
      ~errors,
      ~route,
      ~submitting,
      _children,
    ) => {
  ...component,
  render: _self => {
    let register = route === Types.Register;
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
            <Errors data=errors />
            <form onSubmit>
              (
                register ?
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type_="text"
                      placeholder="Your Name"
                      value=username
                      onChange=onUsernameChange
                      onBlur=onUsernameBlur
                      disabled=submitting
                    />
                  </fieldset> :
                  nullEl
              )
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="text"
                  placeholder="Email"
                  value=email
                  onChange=onEmailChange
                  onBlur=onEmailBlur
                  disabled=submitting
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="password"
                  placeholder="Password"
                  value=password
                  onChange=onPasswordChange
                  onBlur=onPasswordBlur
                  disabled=submitting
                />
              </fieldset>
              <button
                disabled=submitting
                className="btn btn-lg btn-primary pull-xs-right">
                (
                  (
                    switch (register, submitting) {
                    | (true, true)
                    | (false, true) => "Submitting..."
                    | (true, false) => "Sign up"
                    | (false, false) => "Sign in"
                    }
                  )
                  |> strEl
                )
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>;
  },
};
