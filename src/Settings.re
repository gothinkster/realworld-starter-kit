open Utils;

module Form = {
  type field =
    | Image
    | Username
    | Password
    | Email
    | Bio;
  type value = string;
  type state = {
    image: string,
    username: string,
    password: string,
    email: string,
    bio: string,
  };
  type message = string;
  let get = (field, state) =>
    switch (field) {
    | Image => state.image
    | Username => state.username
    | Password => state.password
    | Email => state.email
    | Bio => state.bio
    };
  let update = ((field, value), state) =>
    switch (field, value) {
    | (Image, image) => {...state, image}
    | (Username, username) => {...state, username}
    | (Password, password) => {...state, password}
    | (Email, email) => {...state, email}
    | (Bio, bio) => {...state, bio}
    };
  let valueEmpty = value => value === "";
  let strategy = Formality.Strategy.OnFirstSuccessOrFirstBlur;
  module Validators =
    Formality.MakeValidators({
      type t = field;
    });
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
               | v when v !== "" && !Js.String.startsWith("http", v) =>
                 Invalid("Image URL didn't starts with 'http'")
               | ""
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
             dependents: None,
             validate: (value, _state) => {
               let minLength = 8;
               switch (value) {
               | "" => Invalid("Password is empty")
               | v when String.length(v) > 0 && String.length(v) < minLength =>
                 Invalid(
                   {j|Password is too short (minimum is $(minLength)+ characters)|j},
                 )
               | _ => Valid
               };
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
               | v when !Js.Re.test(v, Regex.validEmail) =>
                 Invalid("Email is invalid")
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
               | _ => Valid
               },
           },
         )
    );
};

module FormContainer = Formality.Make(Form);

module Placeholder = {
  let component = ReasonReact.statelessComponent("Placeholder");
  let make = (~message="Loading...", _children) => {
    ...component,
    render: _self =>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              {message |> strEl}
            </div>
          </div>
        </div>
      </div>,
  };
};

let component = ReasonReact.statelessComponent("Settings");

let make = (~onLogoutClick, ~user: Types.User.t, _children) => {
  ...component,
  render: _self =>
    <FormContainer
      initialState={
        image: user.image->(Belt.Option.getWithDefault("")),
        username: user.username,
        password: "",
        email: user.email,
        bio: user.bio->(Belt.Option.getWithDefault("")),
      }
      onSubmit={
        (state, {notifyOnSuccess, notifyOnFailure, reset}) => {
          let {Form.email, username, password, image, bio} = state;
          Js.Promise.(
            API.updateUser(~email, ~username, ~password, ~image, ~bio, ())
            |> then_(result => {
                 switch (result) {
                 | Belt.Result.Ok(_) =>
                   notifyOnSuccess(None);
                   reset();
                   ReasonReact.Router.push("/#/profile/" ++ username);
                 | Error(error) =>
                   let errors =
                     error
                     |> Json.Decode.(field("errors", dict(array(string))));
                   let fieldErrors =
                     [
                       errors->(Js.Dict.get("email"))
                       |> getFirstError(Form.Email, "Email"),
                       errors->(Js.Dict.get("username"))
                       |> getFirstError(Form.Username, "Username"),
                       errors->(Js.Dict.get("password"))
                       |> getFirstError(Form.Password, "Password"),
                       errors->(Js.Dict.get("image"))
                       |> getFirstError(Form.Image, "Image"),
                       errors->(Js.Dict.get("bio"))
                       |> getFirstError(Form.Bio, "Bio"),
                     ]
                     ->(Belt.List.keepMapU((. opt) => opt));
                   notifyOnFailure(fieldErrors, None);
                 };
                 ignore() |> resolve;
               })
            |> catch(error => {
                 Js.log2(
                   "There has been a problem with fetch operation: ",
                   error,
                 );
                 notifyOnFailure(
                   [],
                   Some("failed to update account settings"),
                 );
                 ignore() |> resolve;
               })
            |> ignore
          );
          ignore();
        }
      }>
      ...{
           form => {
             let errors =
               switch (form.status) {
               | Editing =>
                 [Form.Image, Username, Password, Email, Bio]
                 |> getSomeErrors(form.results)
               | Submitting
               | Submitted => None
               | SubmissionFailed(fieldErrors, Some(message)) =>
                 Some(
                   fieldErrors
                   ->(Belt.List.mapU((. (_field, message)) => message))
                   ->(Belt.List.concat([message])),
                 )
               | SubmissionFailed(fieldErrors, None) =>
                 Some(
                   fieldErrors->(
                                  Belt.List.mapU((. (_field, message)) =>
                                    message
                                  )
                                ),
                 )
               };
             <div className="settings-page">
               <div className="container page">
                 <div className="row">
                   <div className="col-md-6 offset-md-3 col-xs-12">
                     <h1 className="text-xs-center">
                       {"Your Settings" |> strEl}
                     </h1>
                     <Errors data=errors />
                     <form
                       onSubmit={form.submit |> Formality.Dom.preventDefault}>
                       <fieldset>
                         <fieldset className="form-group">
                           <input
                             className="form-control"
                             type_="text"
                             placeholder="URL of profile picture"
                             disabled={form.submitting}
                             value={form.state.image}
                             onChange={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Image)
                             }
                             onBlur={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Image)
                             }
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             className="form-control form-control-lg"
                             type_="text"
                             placeholder="Your Name"
                             disabled={form.submitting}
                             value={form.state.username}
                             onChange={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Username)
                             }
                             onBlur={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Username)
                             }
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <textarea
                             className="form-control form-control-lg"
                             rows=8
                             placeholder="Short bio about you"
                             disabled={form.submitting}
                             value={form.state.bio}
                             onChange={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Bio)
                             }
                             onBlur={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Bio)
                             }
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             className="form-control form-control-lg"
                             type_="text"
                             placeholder="Email"
                             disabled={form.submitting}
                             value={form.state.email}
                             onChange={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Email)
                             }
                             onBlur={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Email)
                             }
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             className="form-control form-control-lg"
                             type_="password"
                             placeholder="Password"
                             disabled={form.submitting}
                             value={form.state.password}
                             onChange={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Password)
                             }
                             onBlur={
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Password)
                             }
                           />
                         </fieldset>
                         <button
                           className="btn btn-lg btn-primary pull-xs-right">
                           {"Update Settings" |> strEl}
                         </button>
                       </fieldset>
                     </form>
                     <hr />
                     <button
                       className="btn btn-outline-danger"
                       onClick=onLogoutClick>
                       {"Or click here to logout." |> strEl}
                     </button>
                   </div>
                 </div>
               </div>
             </div>;
           }
         }
    </FormContainer>,
};
