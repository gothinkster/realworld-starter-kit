open Utils;

module Form = {
  type field =
    | Username
    | Email
    | Password;
  type value = string;
  type state = {
    username: string,
    email: string,
    password: string,
  };
  type message = string;
  let get = (field, state) =>
    switch (field) {
    | Username => state.username
    | Email => state.email
    | Password => state.password
    };
  let update = ((field, value), state) =>
    switch (field, value) {
    | (Username, username) => {...state, username}
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
           Username,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Username is empty")
               | _ => Valid
               },
           },
         )
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

let component = ReasonReact.statelessComponent("Register");

let make = (~onSuccessRegister, _children) => {
  ...component,
  render: _self =>
    <FormContainer
      initialState={username: "", email: "", password: ""}
      onSubmit=(
        (state, {notifyOnSuccess, notifyOnFailure, reset}) => {
          let {Form.username, email, password} = state;
          Js.Promise.(
            API.register(~username, ~email, ~password)
            |> then_(result => {
                 switch (result) {
                 | Js.Result.Ok(json) =>
                   let user =
                     json |> Json.Decode.(field("user", Decoder.user));
                   notifyOnSuccess(None);
                   reset();
                   setCookie("token", user.token);
                   onSuccessRegister();
                   ReasonReact.Router.push("/#/");
                 | Error(error) =>
                   let errors =
                     error
                     |> Json.Decode.(field("errors", dict(array(string))));
                   let fieldErrors =
                     [
                       errors
                       |. Js.Dict.get("username")
                       |> getFirstError(Form.Username, "Username"),
                       errors
                       |. Js.Dict.get("email")
                       |> getFirstError(Form.Email, "Email"),
                       errors
                       |. Js.Dict.get("password")
                       |> getFirstError(Form.Password, "Password"),
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
                 notifyOnFailure([], Some("failed to register new account"));
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
                 route=Types.Register
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
                   switch (form.status) {
                   | Editing =>
                     [Username, Email, Password]
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
