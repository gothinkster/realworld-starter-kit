open Utils;

requireCSS("./App.css");

let logo = requireAssetURI("./logo.svg");

type route =
  | Home
  | Login
  | Register
  | Settings
  | Editor
  | Article
  | Profile(string, option(bool));

type action =
  | ChangeRoute(route);

type state = {
  route,
  x: int,
};

let component = ReasonReact.reducerComponent("App");

let makeLinkClass = (current, target) =>
  "nav-link" ++ (current === target ? " active" : "");

let urlToRoute = (url: ReasonReact.Router.url) : route => {
  let hash = url.hash |> Js.String.split("/");
  Js.Array.shift(hash) |> ignore;
  switch (hash) {
  | [|"login"|] => Login
  | [|"register"|] => Register
  | [|"settings"|] => Settings
  | [|"editor"|] => Editor
  | [|"article"|] => Article
  | [|"profile", author|] => Profile(author, None)
  | [|"profile", author, favorites|] => Profile(author, Some(true))
  | [|_|]
  | [||]
  | _ => Home
  };
};

let make = _children => {
  ...component,
  initialState: () => {
    route: urlToRoute(ReasonReact.Router.dangerouslyGetInitialUrl()),
    x: 0,
  },
  reducer: (action, state) =>
    switch (action) {
    | ChangeRoute(route) => ReasonReact.Update({...state, route})
    },
  subscriptions: self => [
    Sub(
      () =>
        ReasonReact.Router.watchUrl(url =>
          self.send(ChangeRoute(urlToRoute(url)))
        ),
      ReasonReact.Router.unwatchUrl,
    ),
  ],
  render: ({state}) => {
    let linkCx = makeLinkClass(state.route);
    <div>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#/"> ("conduit" |> strEl) </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className=(linkCx(Home)) href="/#/"> ("Home" |> strEl) </a>
            </li>
            <li className="nav-item">
              <a className=(linkCx(Editor)) href="/#/editor">
                <i className="ion-compose" />
                (" New Post" |> strEl)
              </a>
            </li>
            <li className="nav-item">
              <a className=(linkCx(Settings)) href="/#/settings">
                <i className="ion-gear-a" />
                (" Settings" |> strEl)
              </a>
            </li>
            <li className="nav-item">
              <a className=(linkCx(Register)) href="/#/register">
                ("Sign up" |> strEl)
              </a>
            </li>
          </ul>
        </div>
      </nav>
      (
        switch (state.route) {
        | Login
        | Register => <Sign register=(state.route === Register) />
        | Settings => <Settings />
        | Editor => <Editor />
        | Profile(author, favorites) => <Profile author favorites />
        | Article => <Article />
        | Home => <Home />
        }
      )
      <footer>
        <div className="container">
          <a href="/" className="logo-font"> ("conduit" |> strEl) </a>
          <span className="attribution">
            ("An interactive learning project from " |> strEl)
            <a href="https://thinkster.io"> ("Thinkster" |> strEl) </a>
            (". Code & design licensed under MIT." |> strEl)
          </span>
        </div>
      </footer>
    </div>;
  },
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
