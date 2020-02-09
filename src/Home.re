module AsyncResult = Relude.AsyncResult;
module AsyncData = Relude.AsyncData;

module ArticlePreview = {
  [@react.component]
  let make = (~data: Shape.Article.t) => {
    <div className="article-preview">
      <div className="article-meta">
        <Link location={Link.profile(~username=data.author.username)}>
          <img src={data.author.image} />
        </Link>
        <div className="info">
          <Link
            className="author"
            location={Link.profile(~username=data.author.username)}>
            data.author.username->React.string
          </Link>
          <span className="date">
            {data.createdAt->Js.Date.toLocaleString->React.string}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" />
          {data.favoritesCount->Js.Int.toString->React.string}
        </button>
      </div>
      <Link location={Link.article(~slug=data.slug)} className="preview-link">
        <h1> data.title->React.string </h1>
        <p> data.description->React.string </p>
        <span> "Read more..."->React.string </span>
      </Link>
    </div>;
  };
};

module PopularTags = {
  [@react.component]
  let make = (~data: AsyncResult.t(Shape.Tags.t, Error.t), ~onClick) => {
    <>
      <p> "Popular Tags"->React.string </p>
      <WithTestId id="tag-list">
        <div className="tag-list">
          {switch (data) {
           | Init => React.string("Initilizing...")
           | Loading => React.string("Loading...")
           | Reloading(Ok(tags))
           | Complete(Ok(tags)) =>
             tags
             |> Js.Array.map(tag =>
                  <a
                    key=tag
                    href="#"
                    className="tag-pill tag-default"
                    onClick={event =>
                      if (Utils.isMouseRightClick(event)) {
                        event->ReactEvent.Mouse.preventDefault;
                        tag->onClick->ignore;
                      }
                    }>
                    tag->React.string
                  </a>
                )
             |> React.array
           | Reloading(Error(_error))
           | Complete(Error(_error)) => React.string("ERROR")
           }}
        </div>
      </WithTestId>
    </>;
  };
};

module Pagination = {
  [@react.component]
  let make = (~limit: int, ~offset: int, ~total: int, ~onClick: int => unit) =>
    if (total == 0) {
      React.null;
    } else {
      let pages =
        Js.Math.ceil(float_of_int(total) /. float_of_int(limit)) - 1;

      <WithTestId id="page-link">
        <ul className="pagination">
          {Belt.Array.range(0, pages)
           ->Belt.Array.map(page => {
               let className =
                 if (offset == 0 && page == 0 || page == offset / limit) {
                   "page-item active";
                 } else {
                   "page-item";
                 };

               <li key={page->string_of_int} className>
                 <a
                   className="page-link"
                   href={Printf.sprintf("#%d", page)}
                   onClick={event =>
                     if (Utils.isMouseRightClick(event)) {
                       event->ReactEvent.Mouse.preventDefault;
                       onClick(page * limit);
                     }
                   }>
                   {string_of_int(page + 1)->React.string}
                 </a>
               </li>;
             })
           ->React.array}
        </ul>
      </WithTestId>;
    };
};

let useFeedType = (~user: option(Shape.User.t)) => {
  React.useState(() =>
    switch (user) {
    | None => Shape.FeedType.Global(10, 0)
    | Some(_) => Shape.FeedType.Personal(10, 0)
    }
  );
};

[@react.component]
let make = (~user: option(Shape.User.t)) => {
  let (feedType, setFeedType) = useFeedType(~user);
  let articles = Hook.useArticles(~feedType);
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
          <WithTestId id="feed-toggle">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <Security.AuthenticatedOnly user>
                  <li className="nav-item">
                    <a
                      className={
                        switch (feedType) {
                        | Tag(_)
                        | Global(_) => "nav-link"
                        | Personal(_) => "nav-link active"
                        }
                      }
                      href="#your_feed"
                      onClick={event =>
                        if (Utils.isMouseRightClick(event)) {
                          event->ReactEvent.Mouse.preventDefault;
                          setFeedType(_ => Personal(10, 0));
                        }
                      }>
                      "Your Feed"->React.string
                    </a>
                  </li>
                </Security.AuthenticatedOnly>
                <li className="nav-item">
                  <a
                    className={
                      switch (feedType) {
                      | Global(_) => "nav-link active"
                      | Tag(_)
                      | Personal(_) => "nav-link"
                      }
                    }
                    href="#global"
                    onClick={event =>
                      if (Utils.isMouseRightClick(event)) {
                        event->ReactEvent.Mouse.preventDefault;
                        setFeedType(_ => Global(10, 0));
                      }
                    }>
                    "Global Feed"->React.string
                  </a>
                </li>
                {switch (feedType) {
                 | Tag(tag, _, _) =>
                   <li className="nav-item">
                     <a
                       className="nav-link active"
                       href="#"
                       onClick={event =>
                         event->ReactEvent.Mouse.preventDefault
                       }>
                       <i className="ion-pound" />
                       " "->React.string
                       tag->React.string
                     </a>
                   </li>
                 | Global(_)
                 | Personal(_) => React.null
                 }}
                {if (articles |> AsyncResult.isBusy) {
                   <li className="nav-item"> <Spinner /> </li>;
                 } else {
                   React.null;
                 }}
              </ul>
            </div>
          </WithTestId>
          {switch (articles) {
           | Init => React.null
           | Loading => React.null
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
          {switch (feedType) {
           | Tag(_, limit, offset)
           | Global(limit, offset)
           | Personal(limit, offset) =>
             let total =
               switch (articles) {
               | Init
               | Loading
               | Reloading(Error(_))
               | Complete(Error(_)) => 0
               | Reloading(Ok({articlesCount}))
               | Complete(Ok({articlesCount})) => articlesCount
               };

             <Pagination
               limit
               offset
               total
               onClick={offset =>
                 setFeedType(
                   fun
                   | Tag(tag, limit, _) => Tag(tag, limit, offset)
                   | Global(limit, _) => Global(limit, offset)
                   | Personal(limit, _) => Personal(limit, offset),
                 )
               }
             />;
           }}
        </div>
        <div className="col-md-3">
          <div className="sidebar">
            <PopularTags
              data=tags
              onClick={tag =>
                setFeedType(
                  fun
                  | Tag(_, limit, offset) => Tag(tag, limit, offset)
                  | Global(_)
                  | Personal(_) => Tag(tag, 10, 0),
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  </div>;
};
