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

let make = _children => {
  ...component,
  render: _self =>
    <FormContainer
      initialState={email: "", password: ""}
      onSubmit=(
        (state, {notifyOnSuccess, notifyOnFailure, reset}) => {
          Js.log2("login submit", state);
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
                 errors=([Email, Password] |> getSomeErrors(form.results))
               />
             )
         )
    </FormContainer>,
};
