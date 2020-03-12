open Relude.Globals;

module Decode = Decode.AsResult.OfParseError;

let parseTagList: string => array(string) =
  str =>
    str
    |> String.splitArray(~delimiter=",")
    |> Array.map(String.trim)
    |> Array.filterNot(String.isEmpty);

module Form = {
  [@react.component]
  let make =
      (~data, ~setData, ~onSubmit: ((Shape.Article.t, string)) => unit) => {
    let isBusy = data |> AsyncResult.isBusy;
    let error =
      data
      |> AsyncResult.getOk
      |> Option.flatMap(((_article, _tagList, error)) => error);

    <>
      {switch (error) {
       | None => React.null
       | Some((error: Shape.Editor.t)) =>
         <ul className="error-messages">
           <ErrorDetails label="title" error={error.title} />
           <ErrorDetails label="body" error={error.body} />
           <ErrorDetails label="description" error={error.description} />
         </ul>
       }}
      <form>
        <fieldset>
          <fieldset className="form-group">
            <input
              type_="text"
              className="form-control form-control-lg"
              placeholder="Article Title"
              disabled=isBusy
              value={
                data
                |> AsyncResult.getOk
                |> Option.map(
                     (
                       (
                         article: Shape.Article.t,
                         _tagList: string,
                         _error: option(Shape.Editor.t),
                       ),
                     ) =>
                     article.title
                   )
                |> Option.getOrElse("")
              }
              onChange={event => {
                let title = ReactEvent.Form.target(event)##value;
                setData(
                  AsyncResult.map(
                    (
                      (
                        article: Shape.Article.t,
                        tagList: string,
                        error: option(Shape.Editor.t),
                      ),
                    ) =>
                    ({...article, title}, tagList, error)
                  ),
                );
              }}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type_="text"
              className="form-control"
              placeholder="What's this article about?"
              disabled=isBusy
              value={
                data
                |> AsyncResult.getOk
                |> Option.map(
                     (
                       (
                         article: Shape.Article.t,
                         _tagList: string,
                         _error: option(Shape.Editor.t),
                       ),
                     ) =>
                     article.description
                   )
                |> Option.getOrElse("")
              }
              onChange={event => {
                let description = ReactEvent.Form.target(event)##value;
                setData(
                  AsyncResult.map(
                    (
                      (
                        article: Shape.Article.t,
                        tagList: string,
                        error: option(Shape.Editor.t),
                      ),
                    ) =>
                    ({...article, description}, tagList, error)
                  ),
                );
              }}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows=8
              placeholder="Write your article (in markdown)"
              disabled=isBusy
              value={
                data
                |> AsyncResult.getOk
                |> Option.map(
                     (
                       (
                         article: Shape.Article.t,
                         _tagList: string,
                         _error: option(Shape.Editor.t),
                       ),
                     ) =>
                     article.body
                   )
                |> Option.getOrElse("")
              }
              onChange={event => {
                let body = ReactEvent.Form.target(event)##value;
                setData(
                  AsyncResult.map(
                    (
                      (
                        article: Shape.Article.t,
                        tagList: string,
                        error: option(Shape.Editor.t),
                      ),
                    ) =>
                    ({...article, body}, tagList, error)
                  ),
                );
              }}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type_="text"
              className="form-control"
              placeholder="Enter tags"
              disabled=isBusy
              value={
                data
                |> AsyncResult.getOk
                |> Option.map(
                     (
                       (
                         _article: Shape.Article.t,
                         tagList: string,
                         _error: option(Shape.Editor.t),
                       ),
                     ) =>
                     tagList
                   )
                |> Option.getOrElse("")
              }
              onChange={event => {
                let tagList = ReactEvent.Form.target(event)##value;
                setData(
                  AsyncResult.map(
                    (
                      (
                        article: Shape.Article.t,
                        _tagList: string,
                        error: option(Shape.Editor.t),
                      ),
                    ) =>
                    (article, tagList, error)
                  ),
                );
              }}
            />
            <div className="tag-list" />
          </fieldset>
          <button
            className="btn btn-lg pull-xs-right btn-primary"
            type_="button"
            disabled=isBusy
            onClick={event => {
              event |> ReactEvent.Mouse.preventDefault;
              event |> ReactEvent.Mouse.stopPropagation;

              if (isBusy) {
                ignore();
              } else {
                data
                |> AsyncResult.getOk
                |> Option.tapSome(
                     (
                       (
                         article: Shape.Article.t,
                         tagList: string,
                         _error: option(Shape.Editor.t),
                       ),
                     ) =>
                     onSubmit((article, tagList))
                   )
                |> ignore;
              };
            }}>
            {"Publish Article" |> React.string}
          </button>
        </fieldset>
      </form>
    </>;
  };
};

module Create = {
  [@react.component]
  let make = () => {
    let (article, setArticle) =
      React.useState(() =>
        AsyncResult.completeOk((Shape.Article.empty, "", None))
      );

    <Form
      data=article
      setData=setArticle
      onSubmit={((article, tagList)) => {
        setArticle(AsyncResult.toBusy);
        API.article(
          ~action=Create({...article, tagList: parseTagList(tagList)}),
          (),
        )
        |> Js.Promise.then_(
             fun
             | Ok((ok: Shape.Article.t)) => {
                 Link.article(~slug=ok.slug) |> Link.push;
                 setArticle(AsyncResult.toIdle) |> Js.Promise.resolve;
               }
             | Error(Error.Fetch((_code, _message, `json(json)))) =>
               json
               |> Decode.field("errors", Shape.Editor.decode)
               |> Result.tapOk(error =>
                    setArticle(prev =>
                      prev
                      |> AsyncResult.toIdle
                      |> AsyncResult.map(((article, tagList, _error)) =>
                           (article, tagList, Some(error))
                         )
                    )
                  )
               |> ignore
               |> Js.Promise.resolve
             | Error(Fetch((_, _, `text(_))))
             | Error(Decode(_)) =>
               setArticle(AsyncResult.toIdle) |> Js.Promise.resolve,
           )
        |> ignore;
      }}
    />;
  };
};

module Edit = {
  [@react.component]
  let make = (~slug: string) => {
    let (article, setArticle) = Hook.useArticle(~slug);

    <Form
      data=article
      setData=setArticle
      onSubmit={((article, tagList)) => {
        setArticle(AsyncResult.toBusy);
        API.article(
          ~action=
            Update(slug, {...article, tagList: parseTagList(tagList)}),
          (),
        )
        |> Js.Promise.then_(
             fun
             | Ok(_)
             | Error(_) =>
               setArticle(AsyncResult.toIdle) |> Js.Promise.resolve,
           )
        |> ignore;
      }}
    />;
  };
};

[@react.component]
let make = (~slug: option(string)=?) => {
  <div className="editor-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-xs-12">
          {switch (slug) {
           | Some(slug) => <Edit slug />
           | None => <Create />
           }}
        </div>
      </div>
    </div>
  </div>;
};
