let useArticles = () => {
  let didCancel = React.useRef(false);
  let (data, setData) = React.useState(() => None);

  React.useEffect0(() => {
    open Js.Promise;

    API.listArticles()
    |> then_(json => {
         if (!React.Ref.current(didCancel)) {
           setData(_prev => Some(json));
         };
         json |> resolve;
       })
    |> ignore;

    Some(() => React.Ref.setCurrent(didCancel, true));
  });

  data;
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
          <div className="article-preview">
            <div className="article-meta">
              <a href="profile.html">
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </a>
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
              <a href="profile.html">
                <img src="http://i.imgur.com/N4VcUeJ.jpg" />
              </a>
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
            </a>
          </div>
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
