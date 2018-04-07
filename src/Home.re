open Utils;

let component = ReasonReact.statelessComponent("Home");

let make = _children => {
  ...component,
  render: _self =>
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font"> ("conduit" |> strEl) </h1>
          <p> ("A place to share your knowledge." |> strEl) </p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="">
                    ("Your Feed" |> strEl)
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    ("Global Feed" |> strEl)
                  </a>
                </li>
              </ul>
            </div>
            <div className="article-preview">
              <div className="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author"> ("Eric Simons" |> strEl) </a>
                  <span className="date"> ("January 20th" |> strEl) </span>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart" />
                  (" 29" |> strEl)
                </button>
              </div>
              <a href="" className="preview-link">
                <h1> ("How to build webapps that scale" |> strEl) </h1>
                <p> ("This is the description for the post." |> strEl) </p>
                <span> ("Read more..." |> strEl) </span>
              </a>
            </div>
            <div className="article-preview">
              <div className="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author"> ("Albert Pai" |> strEl) </a>
                  <span className="date"> ("January 20th" |> strEl) </span>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart" />
                  (" 32" |> strEl)
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>
                  (
                    "The song you won't ever stop singing. No matter how hard you try."
                    |> strEl
                  )
                </h1>
                <p> ("This is the description for the post." |> strEl) </p>
                <span> ("Read more..." |> strEl) </span>
              </a>
            </div>
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p> ("Popular Tags" |> strEl) </p>
              <div className="tag-list">
                <a href="" className="tag-pill tag-default">
                  ("programming" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("javascript" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("emberjs" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("angularjs" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("react" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("mean" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("node" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("rails" |> strEl)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
};
