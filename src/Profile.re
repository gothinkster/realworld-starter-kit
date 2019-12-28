[@react.component]
let make = (~whose: Route.whose) => {
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
                <a className="nav-link active" href="">
                  "My Articles"->React.string
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  "Favorited Articles"->React.string
                </a>
              </li>
            </ul>
          </div>
          <div className="article-preview">
            <div className="article-meta">
              <a href=""> <img src="http://i.imgur.com/Qr71crq.jpg" /> </a>
              <div className="info">
                <a href="" className="author"> "Eric Simons"->React.string </a>
                <span className="date"> "January 20th"->React.string </span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart" />
                "29"->React.string
              </button>
            </div>
            <a href="" className="preview-link">
              <h1> "How to build webapps that scale"->React.string </h1>
              <p> "This is the description for the post."->React.string </p>
              <span> "Read more..."->React.string </span>
            </a>
          </div>
          <div className="article-preview">
            <div className="article-meta">
              <a href=""> <img src="http://i.imgur.com/N4VcUeJ.jpg" /> </a>
              <div className="info">
                <a href="" className="author"> "Albert Pai"->React.string </a>
                <span className="date"> "January 20th"->React.string </span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart" />
                "32"->React.string
              </button>
            </div>
            <a href="" className="preview-link">
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
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>;
};
