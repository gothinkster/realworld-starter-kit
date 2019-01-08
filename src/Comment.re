open Utils;

module Form = {
  type field =
    | Body;
  type value = string;
  type state = string;
  type message = string;
  let get = (field, state) =>
    switch (field) {
    | Body => state
    };
  let update = ((field, value), _state) =>
    switch (field, value) {
    | (Body, body) => body
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
           Body,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Comment is empty")
               | _ => Valid
               },
           },
         )
    );
};

module FormContainer = Formality.Make(Form);

let component = ReasonReact.statelessComponent("Comment");

let make =
    (~onSubmit=(_state, _submissionCallbacks) => ignore(), ~user, _children) => {
  ...component,
  render: _self =>
    switch (user) {
    | RemoteData.NotAsked
    | Failure(_) =>
      <p>
        <a href="#/login"> {"Sign in" |> strEl} </a>
        {" or " |> strEl}
        <a href="#/register"> {"sign up" |> strEl} </a>
        {" to add comments on this article." |> strEl}
      </p>
    | Loading(_) => "Loading..." |> strEl
    | Success({Types.User.image}) =>
      <FormContainer initialState="" onSubmit>
        ...{form => {
          let errors =
            switch (form.status) {
            | Editing => [Form.Body] |> getSomeErrors(form.results)
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
          <>
            <Errors data=errors />
            <form
              className="card comment-form"
              onSubmit={form.submit |> Formality.Dom.preventDefault}>
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows=3
                  disabled={form.submitting}
                  value={form.state}
                  onChange={event =>
                    event
                    |> Formality.Dom.toValueOnChange
                    |> form.change(Body)
                  }
                  onBlur={event =>
                    event |> Formality.Dom.toValueOnBlur |> form.change(Body)
                  }
                />
              </div>
              <div className="card-footer">
                <Img src=image className="comment-author-img" />
                <button className="btn btn-sm btn-primary">
                  {"Post Comment" |> strEl}
                </button>
              </div>
            </form>
          </>;
        }}
      </FormContainer>
    },
};
