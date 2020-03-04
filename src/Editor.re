open Relude.Globals;

module Form = {
  [@react.component]
  let make = (~data, ~setData) => {
    let isBusy = data |> AsyncResult.isBusy;

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
              |> Option.map(((article: Shape.Article.t, _tagList: string)) =>
                   article.title
                 )
              |> Option.getOrElse("")
            }
            onChange={event => {
              let title = event->ReactEvent.Form.target##value;
              setData(
                AsyncResult.map(
                  ((article: Shape.Article.t, tagList: string)) =>
                  ({...article, title}, tagList)
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
              |> Option.map(((article: Shape.Article.t, _tagList: string)) =>
                   article.description
                 )
              |> Option.getOrElse("")
            }
            onChange={event => {
              let description = event->ReactEvent.Form.target##value;
              setData(
                AsyncResult.map(
                  ((article: Shape.Article.t, tagList: string)) =>
                  ({...article, description}, tagList)
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
              |> Option.map(((article: Shape.Article.t, _tagList: string)) =>
                   article.body
                 )
              |> Option.getOrElse("")
            }
            onChange={event => {
              let body = event->ReactEvent.Form.target##value;
              setData(
                AsyncResult.map(
                  ((article: Shape.Article.t, tagList: string)) =>
                  ({...article, body}, tagList)
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
              |> Option.map(((_article: Shape.Article.t, tagList: string)) =>
                   tagList
                 )
              |> Option.getOrElse("")
            }
            onChange={event => {
              let tagList = event->ReactEvent.Form.target##value;
              setData(
                AsyncResult.map(
                  ((article: Shape.Article.t, _tagList: string)) =>
                  (article, tagList)
                ),
              );
            }}
          />
          <div className="tag-list" />
        </fieldset>
        <button
          className="btn btn-lg pull-xs-right btn-primary"
          type_="button"
          disabled=isBusy>
          "Publish Article"->React.string
        </button>
      </fieldset>
    </form>;
  };
};

module Create = {
  [@react.component]
  let make = () => {
    let (article, setArticle) =
      React.useState(() => AsyncResult.completeOk((Shape.Article.empty, "")));
    <Form data=article setData=setArticle />;
  };
};

module Edit = {
  [@react.component]
  let make = (~slug: string) => {
    let (article, setArticle) = Hook.useArticle(~slug);
    <Form data=article setData=setArticle />;
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
