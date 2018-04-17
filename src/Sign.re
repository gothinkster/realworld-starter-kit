open Utils;

let getSomeErrors = (results, fields) => {
  let validation =
    fields
    |. Belt.List.mapU((. field) =>
         switch (field |> results) {
         | Some(Formality.Invalid(message)) => [message]
         | Some(Valid)
         | None => []
         }
       )
    |. Belt.List.flatten;
  switch (validation) {
  | [] => None
  | data => Some(data)
  };
};

module Body = {
  let component = ReasonReact.statelessComponent("Sign");
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
        ~register,
        ~submitting,
        _children,
      ) => {
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
              (
                switch (errors) {
                | Some(data) =>
                  <ul className="error-messages">
                    (
                      data
                      |. Belt.List.mapU((. item) =>
                           <li> (item |> strEl) </li>
                         )
                      |> Belt.List.toArray
                      |> arrayEl
                    )
                  </ul>
                | Some([])
                | None => nullEl
                }
              )
              <form onSubmit>
                (
                  register ?
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        _type="text"
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
                    _type="text"
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
                    _type="password"
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
      </div>,
  };
};

let component = ReasonReact.statelessComponent("Sign");

let make = (~register, _children) => {
  ...component,
  render: _self =>
    register ?
      <RegisterForm.Container
        initialState=RegisterForm.initialState
        onSubmit=(
          (state, {notifyOnSuccess, notifyOnFailure, reset}) => {
            Js.log2("register submit", state);
            ignore();
          }
        )>
        ...(
             form =>
               RegisterForm.Form.(
                 <Body
                   register
                   submitting=form.submitting
                   username=form.state.username
                   onUsernameChange=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnChange
                       |> form.change(Username)
                   )
                   onUsernameBlur=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnBlur
                       |> form.change(Username)
                   )
                   email=form.state.email
                   onEmailChange=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnChange
                       |> form.change(Email)
                   )
                   onEmailBlur=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnBlur
                       |> form.change(Email)
                   )
                   password=form.state.password
                   onPasswordChange=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnChange
                       |> form.change(Password)
                   )
                   onPasswordBlur=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnBlur
                       |> form.change(Password)
                   )
                   onSubmit=(form.submit |> Formality.Dom.preventDefault)
                   errors=(
                     [Username, Email, Password]
                     |> getSomeErrors(form.results)
                   )
                 />
               )
           )
      </RegisterForm.Container> :
      <LoginForm.Container
        initialState=LoginForm.initialState
        onSubmit=(
          (state, {notifyOnSuccess, notifyOnFailure, reset}) => {
            Js.log2("login submit", state);
            ignore();
          }
        )>
        ...(
             form =>
               LoginForm.Form.(
                 <Body
                   register
                   submitting=form.submitting
                   username=""
                   onUsernameChange=ignore
                   onUsernameBlur=ignore
                   email=form.state.email
                   onEmailChange=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnChange
                       |> form.change(Email)
                   )
                   onEmailBlur=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnBlur
                       |> form.change(Email)
                   )
                   password=form.state.password
                   onPasswordChange=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnChange
                       |> form.change(Password)
                   )
                   onPasswordBlur=(
                     event =>
                       event
                       |> Formality.Dom.toValueOnBlur
                       |> form.change(Password)
                   )
                   onSubmit=(form.submit |> Formality.Dom.preventDefault)
                   errors=([Email, Password] |> getSomeErrors(form.results))
                 />
               )
           )
      </LoginForm.Container>,
};
