open Utils;

module Form = {
  type field =
    | Title
    | Description
    | Body
    | TagList;
  type value = string;
  type state = {
    title: string,
    description: string,
    body: string,
    tagList: list(string),
  };
  type message = string;
  let get = (field, state) =>
    switch (field) {
    | Title => state.title
    | Description => state.description
    | Body => state.body
    | TagList => state.tagList |> Belt.List.toArray |> Js.Array.joinWith(",")
    };
  let update = ((field, value), state) =>
    switch (field, value) {
    | (Title, title) => {...state, title}
    | (Description, description) => {...state, description}
    | (Body, body) => {...state, body}
    | (TagList, tagList) => {
        ...state,
        tagList: tagList |> Js.String.split(",") |> Belt.List.fromArray,
      }
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
           Title,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Title is empty")
               | _ => Valid
               },
           },
         )
      |> Validators.add(
           Description,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Description is empty")
               | _ => Valid
               },
           },
         )
      |> Validators.add(
           Body,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Body is empty")
               | _ => Valid
               },
           },
         )
      |> Validators.add(
           TagList,
           {
             strategy,
             dependents: None,
             validate: (value, _state) =>
               switch (value) {
               | "" => Invalid("Tag is empty")
               | _ => Valid
               },
           },
         )
    );
};

module FormContainer = Formality.Make(Form);

let component = ReasonReact.statelessComponent("Editor");

let make = _children => {
  ...component,
  render: _self =>
    <FormContainer
      initialState={title: "", description: "", body: "", tagList: []}
      onSubmit=(
        (state, {notifyOnSuccess, notifyOnFailure, reset}) => {
          Js.log(state);
          ignore();
        }
      )>
      ...(
           form =>
             <div className="editor-page">
               <div className="container page">
                 <div className="row">
                   <div className="col-md-10 offset-md-1 col-xs-12">
                     <form>
                       <fieldset>
                         <fieldset className="form-group">
                           <input
                             _type="text"
                             className="form-control form-control-lg"
                             placeholder="Article Title"
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             _type="text"
                             className="form-control"
                             placeholder="What's this article about?"
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <textarea
                             className="form-control"
                             rows=8
                             placeholder="Write your article (in markdown)"
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             _type="text"
                             className="form-control"
                             placeholder="Enter tags"
                           />
                           <div className="tag-list" />
                         </fieldset>
                         <button
                           className="btn btn-lg pull-xs-right btn-primary"
                           _type="button">
                           ("Publish Article" |> strEl)
                         </button>
                       </fieldset>
                     </form>
                   </div>
                 </div>
               </div>
             </div>
         )
    </FormContainer>,
};
