[@react.component]
let make = () => {
  <nav className="navbar navbar-light">
    <div className="container">
      <Link className="navbar-brand" route=Route.home>
        "conduit"->React.string
      </Link>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link className="nav-link active" route=Route.home>
            "Home"->React.string
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" route=Route.createArticle>
            <i className="ion-compose" />
            " New Post"->React.string
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" route=Route.settings>
            <i className="ion-gear-a" />
            " Settings"->React.string
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" route=Route.register>
            "Sign up"->React.string
          </Link>
        </li>
      </ul>
    </div>
  </nav>;
};
