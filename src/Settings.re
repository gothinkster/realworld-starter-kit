open Utils;

module Form = {
  type field =
    | Image
    | Username
    | Password
    | PasswordConfirmaion
    | Email
    | Bio;
  type value = string;
  type state = {
    image: string,
    username: string,
    password: string,
    passwordConfirmation: string,
    email: string,
    bio: string,
  };
  type message = string;
  let get = (field, state) =>
    switch (field) {
    | Image => state.image
    | Username => state.username
    | Password => state.password
    | PasswordConfirmaion => state.passwordConfirmation
    | Email => state.email
    | Bio => state.bio
    };
  let update = ((field, value), state) =>
    switch (field, value) {
    | (Image, image) => {...state, image}
    | (Username, username) => {...state, username}
    | (Password, password) => {...state, password}
    | (PasswordConfirmaion, passwordConfirmation) => {
        ...state,
        passwordConfirmation,
      }
    | (Email, email) => {...state, email}
    | (Bio, bio) => {...state, bio}
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
           Image,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Image is empty")
               | _ => Valid
               },
           },
         )
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
           Password,
           {
             strategy,
             dependents: Some([PasswordConfirmaion]),
             validate: (value, _state) => {
               let minLength = 3;
               switch (value) {
               | "" => Invalid("Password is empty")
               | _ when String.length(value) < minLength =>
                 Invalid({j|Password need $(minLength)+ characters|j})
               | _ => Valid
               };
             },
           },
         )
      |> Validators.add(
           PasswordConfirmaion,
           {
             strategy,
             dependents: None,
             validate: (value, state) =>
               switch (value) {
               | "" => Invalid("Password is empty")
               | _ when value !== state.password =>
                 Invalid("Password doesn't match")
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
           Bio,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Bio is empty")
               | _ => Valid
               },
           },
         )
    );
};

module FormContainer = Formality.Make(Form);

let component = ReasonReact.statelessComponent("Settings");

let make = _children => {
  ...component,
  render: _self =>
    <FormContainer
      initialState={
        image: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        email: "",
        bio: "",
      }
      onSubmit=(
        (state, {notifyOnSuccess, notifyOnFailure, reset}) => {
          Js.log(state);
          ignore();
        }
      )>
      ...(
           form => {
             let errors =
               switch (form.status) {
               | Editing =>
                 [
                   Form.Image,
                   Username,
                   Password,
                   PasswordConfirmaion,
                   Email,
                   Bio,
                 ]
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
               };
             <div className="settings-page">
               <div className="container page">
                 <div className="row">
                   <div className="col-md-6 offset-md-3 col-xs-12">
                     <h1 className="text-xs-center">
                       ("Your Settings" |> strEl)
                     </h1>
                     <Errors data=errors />
                     <form
                       onSubmit=(form.submit |> Formality.Dom.preventDefault)>
                       <fieldset>
                         <fieldset className="form-group">
                           <input
                             className="form-control"
                             _type="text"
                             placeholder="URL of profile picture"
                             disabled=form.submitting
                             value=form.state.image
                             onChange=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Image)
                             )
                             onBlur=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Image)
                             )
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             className="form-control form-control-lg"
                             _type="text"
                             placeholder="Your Name"
                             disabled=form.submitting
                             value=form.state.username
                             onChange=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Username)
                             )
                             onBlur=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Username)
                             )
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <textarea
                             className="form-control form-control-lg"
                             rows=8
                             placeholder="Short bio about you"
                             disabled=form.submitting
                             value=form.state.bio
                             onChange=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Bio)
                             )
                             onBlur=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Bio)
                             )
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             className="form-control form-control-lg"
                             _type="text"
                             placeholder="Email"
                             disabled=form.submitting
                             value=form.state.email
                             onChange=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Email)
                             )
                             onBlur=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Email)
                             )
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             className="form-control form-control-lg"
                             _type="password"
                             placeholder="Password"
                             disabled=form.submitting
                             value=form.state.password
                             onChange=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Password)
                             )
                             onBlur=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Password)
                             )
                           />
                         </fieldset>
                         <button
                           className="btn btn-lg btn-primary pull-xs-right">
                           ("Update Settings" |> strEl)
                         </button>
                       </fieldset>
                     </form>
                   </div>
                 </div>
               </div>
             </div>;
           }
         )
    </FormContainer>,
};
