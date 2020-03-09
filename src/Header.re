open Relude.Globals;

[@react.component]
let make = (~user: option(Shape.User.t)) => {
  let currentUser = user |> Option.getOrElse(Shape.User.empty);

  <nav className="navbar navbar-light">
    <div className="container">
      <Link className="navbar-brand" onClick={Link.home |> Link.location}>
        "conduit"->React.string
      </Link>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link
            className="nav-link active" onClick={Link.home |> Link.location}>
            "Home"->React.string
          </Link>
        </li>
        <Security.AnonymousOnly user>
          <>
            <li className="nav-item">
              <Link className="nav-link" onClick={Link.login |> Link.location}>
                "Sign in"->React.string
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link" onClick={Link.register |> Link.location}>
                "Sign up"->React.string
              </Link>
            </li>
          </>
        </Security.AnonymousOnly>
        <Security.AuthenticatedOnly user>
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={Link.createArticle |> Link.location}>
                <i className="ion-compose" />
                " New Post"->React.string
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link" onClick={Link.settings |> Link.location}>
                <i className="ion-gear-a" />
                " Settings"->React.string
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={
                  Link.profile(~username=currentUser.username)
                  |> Link.location
                }>
                currentUser.username->React.string
              </Link>
            </li>
          </>
        </Security.AuthenticatedOnly>
      </ul>
    </div>
  </nav>;
};
