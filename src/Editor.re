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
          let {Form.title, description, body, tagList} = state;
          Js.Promise.(
            API.createArticle(~title, ~description, ~body, ~tagList)
            |> then_(result => {
                 switch (result) {
                 | Js.Result.Ok(json) =>
                   let article: Types.article =
                     Json.Decode.(json |> field("article", Decoder.article));
                   notifyOnSuccess(None);
                   reset();
                   ReasonReact.Router.push("/#/article/" ++ article.slug);
                 | Error(error) =>
                   let errors =
                     error
                     |> Json.Decode.(field("errors", dict(array(string))));
                   let fieldErrors =
                     [
                       errors
                       |. Js.Dict.get("title")
                       |> getFirstError(Form.Title, "Title"),
                       errors
                       |. Js.Dict.get("description")
                       |> getFirstError(Form.Description, "Description"),
                       errors
                       |. Js.Dict.get("body")
                       |> getFirstError(Form.Body, "Body"),
                       errors
                       |. Js.Dict.get("tagList")
                       |> getFirstError(Form.TagList, "Tags"),
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
                 notifyOnFailure([], Some("failed to create new article"));
                 ignore() |> resolve;
               })
            |> ignore
          );
          ignore();
        }
      )>
      ...(
           form => {
             let errors =
               switch (form.status) {
               | Editing =>
                 [Form.Title, Description, Body, TagList]
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
             <div className="editor-page">
               <div className="container page">
                 <div className="row">
                   <div className="col-md-10 offset-md-1 col-xs-12">
                     <Errors data=errors />
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-10 offset-md-1 col-xs-12">
                     <form
                       onSubmit=(form.submit |> Formality.Dom.preventDefault)>
                       <fieldset>
                         <fieldset className="form-group">
                           <input
                             _type="text"
                             className="form-control form-control-lg"
                             placeholder="Article Title"
                             disabled=form.submitting
                             value=form.state.title
                             onChange=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Title)
                             )
                             onBlur=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Title)
                             )
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             _type="text"
                             className="form-control"
                             placeholder="What's this article about?"
                             disabled=form.submitting
                             value=form.state.description
                             onChange=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Description)
                             )
                             onBlur=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Description)
                             )
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <textarea
                             className="form-control"
                             rows=8
                             placeholder="Write your article (in markdown)"
                             disabled=form.submitting
                             value=form.state.body
                             onChange=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(Body)
                             )
                             onBlur=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(Body)
                             )
                           />
                         </fieldset>
                         <fieldset className="form-group">
                           <input
                             _type="text"
                             className="form-control"
                             placeholder="Enter tags"
                             disabled=form.submitting
                             value=(
                               form.state.tagList
                               |> Belt.List.toArray
                               |> Js.Array.joinWith(",")
                             )
                             onChange=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnChange
                                 |> form.change(TagList)
                             )
                             onBlur=(
                               event =>
                                 event
                                 |> Formality.Dom.toValueOnBlur
                                 |> form.change(TagList)
                             )
                           />
                           <div className="tag-list" />
                         </fieldset>
                         <button
                           disabled=form.submitting
                           className="btn btn-lg pull-xs-right btn-primary">
                           ("Publish Article" |> strEl)
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
