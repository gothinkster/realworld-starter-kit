type viewMode =
  | Author(string)
  | Favorited(string);

[@react.component]
let make = (~viewMode: viewMode) => {
  let username =
    switch (viewMode) {
    | Author(username) => username
    | Favorited(username) => username
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
                  className="nav-link active"
                  location={Link.profile(~username)}>
                  "My Articles"->React.string
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link" location={Link.favorited(~username)}>
                  "Favorited Articles"->React.string
                </Link>
              </li>
            </ul>
          </div>
          <div className="article-preview">
            <div className="article-meta">
              <Link location={Link.profile(~username)}>
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </Link>
              <div className="info">
                <Link className="author" location={Link.profile(~username)}>
                  "Eric Simons"->React.string
                </Link>
                <span className="date"> "January 20th"->React.string </span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart" />
                "29"->React.string
              </button>
            </div>
            <Link className="preview-link" location={Link.article(~slug)}>
              <h1> "How to build webapps that scale"->React.string </h1>
              <p> "This is the description for the post."->React.string </p>
              <span> "Read more..."->React.string </span>
            </Link>
          </div>
          <div className="article-preview">
            <div className="article-meta">
              <Link location={Link.profile(~username)}>
                <img src="http://i.imgur.com/N4VcUeJ.jpg" />
              </Link>
              <div className="info">
                <Link className="author" location={Link.profile(~username)}>
                  "Albert Pai"->React.string
                </Link>
                <span className="date"> "January 20th"->React.string </span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart" />
                "32"->React.string
              </button>
            </div>
            <Link className="preview-link" location={Link.article(~slug)}>
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
