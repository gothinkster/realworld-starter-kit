[@react.component]
let make = () => {
  <div className="article-page">
    <div className="banner">
      <div className="container">
        <h1> "How to build webapps that scale"->React.string </h1>
        <div className="article-meta">
          <a href=""> <img src="http://i.imgur.com/Qr71crq.jpg" /> </a>
          <div className="info">
            <a href="" className="author"> "Eric Simons"->React.string </a>
            <span className="date"> "January 20th"->React.string </span>
          </div>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round" />
            " Follow Eric Simons "->React.string
            <span className="counter"> "(10)"->React.string </span>
          </button>
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" />
            " Favorite Post "->React.string
            <span className="counter"> "(29)"->React.string </span>
          </button>
        </div>
      </div>
    </div>
    <div className="container page">
      <div className="row article-content">
        <div className="col-md-12">
          <p>
            "Web development technologies have evolved at an incredible clip over the past few years."
            ->React.string
          </p>
          <h2 id="introducing-ionic">
            "Introducing RealWorld."->React.string
          </h2>
          <p>
            "It's a great solution for learning how other frameworks work."
            ->React.string
          </p>
        </div>
      </div>
      <hr />
      <div className="article-actions">
        <div className="article-meta">
          <a href="profile.html">
            <img src="http://i.imgur.com/Qr71crq.jpg" />
          </a>
          <div className="info">
            <a href="" className="author"> "Eric Simons"->React.string </a>
            <span className="date"> "January 20th"->React.string </span>
          </div>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round" />
            " Follow Eric Simons "->React.string
            <span className="counter"> "(10)"->React.string </span>
          </button>
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" />
            " Favorite Post "->React.string
            <span className="counter"> "(29)"->React.string </span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          <form className="card comment-form">
            <div className="card-block">
              <textarea
                className="form-control"
                placeholder="Write a comment..."
                rows=3
              />
            </div>
            <div className="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                className="comment-author-img"
              />
              <button className="btn btn-sm btn-primary">
                "Post Comment"->React.string
              </button>
            </div>
          </form>
          <div className="card">
            <div className="card-block">
              <p className="card-text">
                "With supporting text below as a natural lead-in to additional content."
                ->React.string
              </p>
            </div>
            <div className="card-footer">
              <a href="" className="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                />
              </a>
              <a href="" className="comment-author">
                "Jacob Schmidt"->React.string
              </a>
              <span className="date-posted"> "Dec 29th"->React.string </span>
            </div>
          </div>
          <div className="card">
            <div className="card-block">
              <p className="card-text">
                "With supporting text below as a natural lead-in to additional content."
                ->React.string
              </p>
            </div>
            <div className="card-footer">
              <a href="" className="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                />
              </a>
              <a href="" className="comment-author">
                "Jacob Schmidt"->React.string
              </a>
              <span className="date-posted"> "Dec 29th"->React.string </span>
              <span className="mod-options">
                <i className="ion-edit" />
                <i className="ion-trash-a" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};
