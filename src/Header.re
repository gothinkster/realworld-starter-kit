[@react.component]
let make = () => {
  <nav className="navbar navbar-light">
    <div className="container">
      <a className="navbar-brand" href="index.html">
        "conduit"->React.string
      </a>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <a className="nav-link active" href="#/"> "Home"->React.string </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/article">
            <i className="ion-compose" />
            " New Post"->React.string
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/settings">
            <i className="ion-gear-a" />
            " Settings"->React.string
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/register">
            "Sign up"->React.string
          </a>
        </li>
      </ul>
    </div>
  </nav>;
};
