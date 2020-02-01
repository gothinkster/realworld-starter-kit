[@react.component]
let make = () => {
  <nav className="navbar navbar-light">
    <div className="container">
      <Link className="navbar-brand" location=Link.home>
        "conduit"->React.string
      </Link>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link className="nav-link active" location=Link.home>
            "Home"->React.string
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" location=Link.createArticle>
            <i className="ion-compose" />
            " New Post"->React.string
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" location=Link.settings>
            <i className="ion-gear-a" />
            " Settings"->React.string
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" location=Link.register>
            "Sign up"->React.string
          </Link>
        </li>
      </ul>
    </div>
  </nav>;
};
