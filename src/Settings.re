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
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center"> ("Your Settings" |> strEl) </h1>
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    _type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    _type="text"
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
                  ("Update Settings" |> strEl)
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>,
};
