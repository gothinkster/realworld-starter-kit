open Utils;

type action =
  | Logout
  | UpdateUser(Types.remoteUser)
  | ChangeRoute(Types.route);

type state = {
  route: Types.route,
  user: Types.remoteUser,
};

let makeLinkClass = (current, target) =>
  "nav-link" ++ (current === target ? " active" : "");

let urlToRoute = (url: ReasonReact.Router.url): Types.route => {
  let hash = url.hash |> Js.String.split("/");
  switch (hash) {
  | [|"", "login"|] => Login
  | [|"", "register"|] => Register
  | [|"", "settings"|] => Settings
  | [|"", "editor"|] => Editor(None)
  | [|"", "editor", slug|] => Editor(Some(slug))
  | [|"", "article", slug|] => Article(slug)
  | [|"", "profile", author|] => Profile(Types.Author(author))
  | [|"", "profile", author, "favorites"|] =>
    Profile(Types.Favorited(author))
  | [|"", _|]
  | [||]
  | _ => Home
  };
};

let getUser = (_payload, {ReasonReact.send}) => {
  send(UpdateUser(RemoteData.Loading()));

  let%Lets.Async.Consume result =
    try%Lets.Async (API.user()) {
    | _error => Js.Json.null->Belt.Result.Error->Lets.Async.resolve
    };

  switch (result) {
  | Belt.Result.Ok(json) =>
    let user = json |> Json.Decode.field("user", Decoder.user);
    send(UpdateUser(RemoteData.Success(user)));
  | Error(_) =>
    send(UpdateUser(RemoteData.Failure("failed to get user data")))
  };

  ignore();
};

let logoutUser = (_payload, {ReasonReact.send}) => send(Logout);

let component = ReasonReact.reducerComponent("App");

let make = _children => {
  ...component,
  initialState: () => {
    route: urlToRoute(ReasonReact.Router.dangerouslyGetInitialUrl()),
    user: RemoteData.NotAsked,
  },
  reducer: (action, state) =>
    switch (action) {
    | Logout =>
      setCookie("token", "");
      ReasonReact.UpdateWithSideEffects(
        {...state, user: RemoteData.NotAsked},
        (_self => ReasonReact.Router.push("/#/")),
      );
    | UpdateUser(user) => ReasonReact.Update({...state, user})
    | ChangeRoute(route) =>
      ReasonReact.UpdateWithSideEffects(
        {...state, route},
        (
          ({handle, state}) =>
            switch (state.user) {
            | RemoteData.NotAsked => handle(getUser, ())
            | Loading(_)
            | Success(_)
            | Failure(_) => ignore()
            }
        ),
      )
    },
  didMount: ({send, onUnmount, handle}) => {
    let urlWatcherId =
      ReasonReact.Router.watchUrl(url =>
        send(ChangeRoute(urlToRoute(url)))
      );
    onUnmount(() => ReasonReact.Router.unwatchUrl(urlWatcherId));
    handle(getUser, ());
  },
  render: ({state, handle}) => {
    let {route, user} = state;
    let linkCx = makeLinkClass(route);
    <div>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#/"> {"conduit" |> strEl} </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className={linkCx(Home)} href="/#/"> {"Home" |> strEl} </a>
            </li>
            {
              switch (user) {
              | NotAsked
              | Loading(_)
              | Failure(_) => nullEl
              | Success(_) =>
                <li className="nav-item">
                  <a
                    className={
                      "nav-link"
                      ++ (
                        switch (route) {
                        | Editor(_) => " active"
                        | _ => ""
                        }
                      )
                    }
                    href="/#/editor">
                    <i className="ion-compose" />
                    {" New Post" |> strEl}
                  </a>
                </li>
              }
            }
            {
              switch (user) {
              | NotAsked
              | Loading(_)
              | Failure(_) => nullEl
              | Success(_) =>
                <li className="nav-item">
                  <a className={linkCx(Settings)} href="/#/settings">
                    <i className="ion-gear-a" />
                    {" Settings" |> strEl}
                  </a>
                </li>
              }
            }
            {
              switch (user) {
              | NotAsked
              | Loading(_)
              | Success(_) => nullEl
              | Failure(_) =>
                <li className="nav-item">
                  <a className={linkCx(Login)} href="/#/login">
                    {"Sign in" |> strEl}
                  </a>
                </li>
              }
            }
            {
              switch (user) {
              | NotAsked
              | Loading(_)
              | Success(_) => nullEl
              | Failure(_) =>
                <li className="nav-item">
                  <a className={linkCx(Register)} href="/#/register">
                    {"Sign up" |> strEl}
                  </a>
                </li>
              }
            }
            {
              switch (user) {
              | NotAsked
              | Loading(_)
              | Failure(_) => nullEl
              | Success({username, image}) =>
                <li className="nav-item">
                  <a
                    className={linkCx(Profile(Author(username)))}
                    href={"/#/profile/" ++ username}>
                    {
                      switch (image) {
                      | Some(src) => <img className="user-pic" src />
                      | None => nullEl
                      }
                    }
                    {username |> strEl}
                  </a>
                </li>
              }
            }
          </ul>
        </div>
      </nav>
      {
        switch (route) {
        | Login => <Login onSuccessLogin={handle(getUser)} />
        | Register => <Register onSuccessRegister={handle(getUser)} />
        | Settings =>
          <PrivateRoute user>
            ...(
                 userData =>
                   <Settings
                     user=userData
                     onLogoutClick={handle(logoutUser)}
                   />
               )
          </PrivateRoute>
        | Editor(slug) => <Editor slug />
        | Profile(author) => <Profile author user />
        | Article(slug) => <Article slug user />
        | Home => <Home user />
        }
      }
      <footer>
        <div className="container">
          <a href="/" className="logo-font"> {"conduit" |> strEl} </a>
          <span className="attribution">
            {"An interactive learning project from " |> strEl}
            <a href="https://thinkster.io"> {"Thinkster" |> strEl} </a>
            {". Code & design licensed under MIT." |> strEl}
          </span>
        </div>
      </footer>
    </div>;
  },
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
