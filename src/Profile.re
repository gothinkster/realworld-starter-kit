module AsyncResult = Relude.AsyncResult;

[@react.component]
let make = (~viewMode: Shape.Profile.viewMode) => {
  let articles = Hook.useArticlesFromProfile(~viewMode);
  let isArticlesBusy = articles |> AsyncResult.isBusy;
  let username =
    switch (viewMode) {
    | Author(username, _limit, _offset) => username
    | Favorited(username, _limit, _offset) => username
    };
  let slug = "";

  <div className="profile-page">
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" />
            <h4> "Eric Simons"->React.string </h4>
            <p>
              "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games"
              ->React.string
            </p>
            <button className="btn btn-sm btn-outline-secondary action-btn">
              <i className="ion-plus-round" />
              " Follow Eric Simons"->React.string
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
              <li className="nav-item">
                <Link
                  className={
                    switch (viewMode) {
                    | Shape.Profile.Author(_) => "nav-link active"
                    | Favorited(_) => "nav-link"
                    }
                  }
                  onClick={Link.availableIf(
                    !isArticlesBusy
                    && (
                      switch (viewMode) {
                      | Author(_) => false
                      | Favorited(_) => true
                      }
                    ),
                    Link.Location(Link.profile(~username)),
                  )}>
                  "My Articles"->React.string
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    switch (viewMode) {
                    | Shape.Profile.Author(_) => "nav-link"
                    | Favorited(_) => "nav-link active"
                    }
                  }
                  onClick={Link.availableIf(
                    !isArticlesBusy && (
                      switch (viewMode) {
                      | Author(_) => true
                      | Favorited(_) => false
                      }
                    ),
                    Link.Location(Link.favorited(~username)),
                  )}>
                  "Favorited Articles"->React.string
                </Link>
              </li>
              {if (articles |> AsyncResult.isBusy) {
                 <li className="nav-item"> <Spinner /> </li>;
               } else {
                 React.null;
               }}
            </ul>
          </div>
          <div className="article-preview">
            <div className="article-meta">
              <Link onClick={Link.profile(~username) |> Link.location}>
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </Link>
              <div className="info">
                <Link
                  className="author"
                  onClick={Link.profile(~username) |> Link.location}>
                  "Eric Simons"->React.string
                </Link>
                <span className="date"> "January 20th"->React.string </span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart" />
                "29"->React.string
              </button>
            </div>
            <Link
              className="preview-link"
              onClick={Link.article(~slug) |> Link.location}>
              <h1> "How to build webapps that scale"->React.string </h1>
              <p> "This is the description for the post."->React.string </p>
              <span> "Read more..."->React.string </span>
            </Link>
          </div>
          <div className="article-preview">
            <div className="article-meta">
              <Link onClick={Link.profile(~username) |> Link.location}>
                <img src="http://i.imgur.com/N4VcUeJ.jpg" />
              </Link>
              <div className="info">
                <Link
                  className="author"
                  onClick={Link.profile(~username) |> Link.location}>
                  "Albert Pai"->React.string
                </Link>
                <span className="date"> "January 20th"->React.string </span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart" />
                "32"->React.string
              </button>
            </div>
            <Link
              className="preview-link"
              onClick={Link.article(~slug) |> Link.location}>
              <h1>
                "The song you won't ever stop singing. No matter how hard you try."
                ->React.string
              </h1>
              <p> "This is the description for the post."->React.string </p>
              <span> "Read more..."->React.string </span>
              <ul className="tag-list">
                <li className="tag-default tag-pill tag-outline">
                  "Music"->React.string
                </li>
                <li className="tag-default tag-pill tag-outline">
                  "Song"->React.string
                </li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>;
};
