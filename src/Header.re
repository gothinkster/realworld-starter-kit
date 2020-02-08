module AsyncData = Relude.AsyncData;
module Option = Relude.Option;

[@react.component]
let make = (~user: option(Shape.User.t)) => {
  let currentUser = user |> Option.getOrElse(Shape.User.empty);

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
        <Security.AnonymousOnly user>
          <>
            <li className="nav-item">
              <Link className="nav-link" location=Link.login>
                "Sign in"->React.string
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" location=Link.register>
                "Sign up"->React.string
              </Link>
            </li>
          </>
        </Security.AnonymousOnly>
        <Security.AuthenticatedOnly user>
          <>
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
              <Link
                className="nav-link"
                location={Link.profile(~username=currentUser.username)}>
                currentUser.username->React.string
              </Link>
            </li>
          </>
        </Security.AuthenticatedOnly>
      </ul>
    </div>
  </nav>;
};
