module AsyncData = Relude.AsyncData;
module Option = Relude.Option;

module Anonymous = {
  [@react.component]
  let make = (~currentUser: AsyncData.t(option(Shape.User.t)), ~children) => {
    switch (currentUser) {
    | Init
    | Loading
    | Reloading(Some(_))
    | Complete(Some(_)) => React.null
    | Reloading(None)
    | Complete(None) => children
    };
  };
};

module Authorized = {
  [@react.component]
  let make = (~currentUser: AsyncData.t(option(Shape.User.t)), ~children) => {
    switch (currentUser) {
    | Init
    | Loading
    | Reloading(None)
    | Complete(None) => React.null
    | Reloading(Some(_))
    | Complete(Some(_)) => children
    };
  };
};

[@react.component]
let make = (~currentUser: AsyncData.t(option(Shape.User.t))) => {
  let user: Shape.User.t =
    currentUser
    |> AsyncData.getValue
    |> Option.flatMap(data => data)
    |> Option.getOrElse(Shape.User.empty);

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
        <Anonymous currentUser>
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
        </Anonymous>
        <Authorized currentUser>
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
                location={Link.profile(~username=user.username)}>
                user.username->React.string
              </Link>
            </li>
          </>
        </Authorized>
      </ul>
    </div>
  </nav>;
};
