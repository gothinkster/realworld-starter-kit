open Utils;

module Form = {
  type field =
    | Email
    | Password;
  type value = string;
  type state = {
    email: string,
    password: string,
  };
  type message = string;
  let get = (field, state) =>
    switch (field) {
    | Email => state.email
    | Password => state.password
    };
  let update = ((field, value), state) =>
    switch (field, value) {
    | (Email, email) => {...state, email}
    | (Password, password) => {...state, password}
    };
  let valueEmpty = value => value === "";
  let strategy = Formality.Strategy.OnFirstSuccessOrFirstBlur;
  module Validators =
    Formality.MakeValidators(
      {
        type t = field;
      },
    );
  type validators =
    Validators.t(Formality.validator(field, value, state, message));
  let validators =
    Formality.(
      Validators.empty
      |> Validators.add(
           Email,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Email is empty")
               | _ => Valid
               },
           },
         )
      |> Validators.add(
           Password,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Password is empty")
               | _ => Valid
               },
           },
         )
    );
};

module FormContainer = Formality.Make(Form);

let component = ReasonReact.statelessComponent("Login");

let make = (~onSuccessLogin, _children) => {
  ...component,
  render: _self =>
    <FormContainer
      initialState={email: "", password: ""}
      onSubmit=(
        (state, {notifyOnSuccess, notifyOnFailure, reset}) => {
          let {Form.email, password} = state;
          Js.Promise.(
            API.login(~email, ~password)
            |> then_(result => {
                 switch (result) {
                 | Js.Result.Ok(json) =>
                   let user =
                     json |> Json.Decode.(field("user", Decoder.user));
                   notifyOnSuccess(None);
                   reset();
                   setCookie("token", user.token);
                   onSuccessLogin();
                   ReasonReact.Router.push("/#/");
                 | Error(error) =>
                   let errors =
                     error
                     |> Json.Decode.(field("errors", dict(array(string))));
                   let fieldErrors =
                     [
                       errors
                       |. Js.Dict.get("email or password")
                       |> getFirstError(Form.Email, "Email or password"),
                     ]
                     |. Belt.List.keepMapU((. opt) => opt);
                   notifyOnFailure(fieldErrors, None);
                 };
                 ignore() |> resolve;
               })
            |> catch(error => {
                 Js.log2(
                   "There has been a problem with fetch operation: ",
                   error,
                 );
                 notifyOnFailure([], Some("failed to login"));
                 ignore() |> resolve;
               })
            |> ignore
          );
          ignore();
        }
      )>
      ...(
           form =>
             Form.(
               <FormBody
                 route=Types.Login
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
                 errors=(
                   switch (form.status) {
                   | Editing =>
                     [Email, Password]
                     |> getSomeErrors(form.results)
                   | Submitting
                   | Submitted => None
                   | SubmissionFailed(fieldErrors, Some(message)) =>
                     Some(
                       fieldErrors
                       |. Belt.List.mapU((. (_field, message)) => message)
                       |. Belt.List.concat([message]),
                     )
                   | SubmissionFailed(fieldErrors, None) =>
                     Some(
                       fieldErrors
                       |. Belt.List.mapU((. (_field, message)) => message),
                     )
                   }
                 )
               />
             )
         )
    </FormContainer>,
};
