module AsyncResult = Relude.AsyncResult;
module Option = Relude.Option;

let useArticles = () => {
  let didCancel = React.useRef(false);
  let (data, setData) = React.useState(() => AsyncResult.init);

  React.useEffect0(() => {
    open Js.Promise;

    if (!React.Ref.current(didCancel)) {
      setData(prev =>
        prev
        |> AsyncResult.getOk
        |> Option.getOrElse(
             Shape.ArticleApiResponse.{articles: [||], articlesCount: 0},
           )
        |> AsyncResult.reloadingOk
      );
    };

    API.listArticles()
    |> then_(data => {
         if (!React.Ref.current(didCancel)) {
           setData(_prev =>
             switch (data) {
             | Belt.Result.Ok(ok) => ok |> AsyncResult.completeOk
             | Error(error) =>
               AppError.EDecodeParseError(error) |> AsyncResult.completeError
             }
           );
         };
         ignore() |> resolve;
       })
    |> catch(error => {
         if (!React.Ref.current(didCancel)) {
           setData(_prev =>
             AppError.EFetch(error) |> AsyncResult.completeError
           );
         };
         ignore() |> resolve;
       })
    |> ignore;

    Some(() => React.Ref.setCurrent(didCancel, true));
  });

  data;
};

module ArticlePreview = {
  [@react.component]
  let make = (~data: Shape.Article.t) => {
    let profileUrl = Printf.sprintf("/#/profile/%s", data.author.username);
    let articleUrl = Printf.sprintf("/#/article/%s", data.slug);

    <div className="article-preview">
      <div className="article-meta">
        <a href=profileUrl> <img src={data.author.image} /> </a>
        <div className="info">
          <a href=profileUrl className="author">
            data.author.username->React.string
          </a>
          <span className="date"> data.createdAt->React.string </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" />
          {data.favoritesCount->Js.Int.toString->React.string}
        </button>
      </div>
      <a href=articleUrl className="preview-link">
        <h1> data.title->React.string </h1>
        <p> data.description->React.string </p>
        <span> "Read more..."->React.string </span>
      </a>
    </div>;
  };
};

[@react.component]
let make = () => {
  let data = useArticles();

  <div className="home-page">
    <div className="banner">
      <div className="container">
        <h1 className="logo-font"> "conduit"->React.string </h1>
        <p> "A place to share your knowledge."->React.string </p>
      </div>
    </div>
    <div className="container page">
      <div className="row">
        <div className="col-md-9">
          <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
              <li className="nav-item">
                <a className="nav-link disabled" href="">
                  "Your Feed"->React.string
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="">
                  "Global Feed"->React.string
                </a>
              </li>
            </ul>
          </div>
          {switch (data) {
           | Init => React.string("---")
           | Loading => React.string("...")
           | Reloading(Ok(data'))
           | Complete(Ok(data')) =>
             data'.articles
             |> Js.Array.map(item =>
                  <ArticlePreview key={item.slug} data=item />
                )
             |> React.array
           | Reloading(Error(_error))
           | Complete(Error(_error)) => React.string("ERROR")
           }}
        </div>
        <div className="col-md-3">
          <div className="sidebar">
            <p> "Popular Tags"->React.string </p>
            <div className="tag-list">
              <a href="" className="tag-pill tag-default">
                "programming"->React.string
              </a>
              <a href="" className="tag-pill tag-default">
                "javascript"->React.string
              </a>
              <a href="" className="tag-pill tag-default">
                "emberjs"->React.string
              </a>
              <a href="" className="tag-pill tag-default">
                "angularjs"->React.string
              </a>
              <a href="" className="tag-pill tag-default">
                "react"->React.string
              </a>
              <a href="" className="tag-pill tag-default">
                "mean"->React.string
              </a>
              <a href="" className="tag-pill tag-default">
                "node"->React.string
              </a>
              <a href="" className="tag-pill tag-default">
                "rails"->React.string
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};
