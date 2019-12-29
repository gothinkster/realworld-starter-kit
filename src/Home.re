module AsyncResult = Relude.AsyncResult;
module AsyncData = Relude.AsyncData;

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
          <span className="date">
            {data.createdAt->Js.Date.toLocaleString->React.string}
          </span>
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

module PopularTags = {
  [@react.component]
  let make = (~data: AsyncResult.t(Shape.Tags.t, AppError.t)) => {
    <>
      <p> "Popular Tags"->React.string </p>
      <div className="tag-list">
        {switch (data) {
         | Init => React.string("Initilizing...")
         | Loading => React.string("Loading...")
         | Reloading(Ok(tags))
         | Complete(Ok(tags)) =>
           tags
           |> Js.Array.map(tag =>
                <a key=tag href="#" className="tag-pill tag-default">
                  tag->React.string
                </a>
              )
           |> React.array
         | Reloading(Error(_error))
         | Complete(Error(_error)) => React.string("ERROR")
         }}
      </div>
    </>;
  };
};

[@react.component]
let make = (~currentUser: AsyncData.t(option(Shape.User.t))) => {
  let articles = Hook.useArticles();
  let tags = Hook.useTags();

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
              {switch (currentUser) {
               | Init
               | Loading
               | Reloading(_)
               | Complete(None) => React.null
               | Complete(Some(_user)) =>
                 <li className="nav-item">
                   <a className="nav-link" href="#">
                     "Your Feed"->React.string
                   </a>
                 </li>
               }}
              <li className="nav-item">
                <a className="nav-link active" href="">
                  "Global Feed"->React.string
                </a>
              </li>
            </ul>
          </div>
          {switch (articles) {
           | Init => React.string("Initilizing...")
           | Loading => React.string("Loading...")
           | Reloading(Ok({articles}))
           | Complete(Ok({articles})) =>
             articles
             |> Js.Array.map(item =>
                  <ArticlePreview key={item.slug} data=item />
                )
             |> React.array
           | Reloading(Error(_error))
           | Complete(Error(_error)) => React.string("ERROR")
           }}
        </div>
        <div className="col-md-3">
          <div className="sidebar"> <PopularTags data=tags /> </div>
        </div>
      </div>
    </div>
  </div>;
};
