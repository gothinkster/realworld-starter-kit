module Option = Belt.Option

@react.component
let make = (~setUser) => {
  let (data, setData) = React.useState(() => AsyncData.complete(("", "", None)))
  let isBusy = data |> AsyncData.isBusy
  let (email, password, error) = data->AsyncData.getValue->Option.getWithDefault(("", "", None))

  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center"> {"Sign in" |> React.string} </h1>
          <p className="text-xs-center">
            <Link onClick={Link.register |> Link.location}>
              {"Need an account?" |> React.string}
            </Link>
          </p>
          {switch error {
          | Some(messages) =>
            <ul className="error-messages">
              {messages
              |> Array.map(message =>
                <li key=message> {`email or password ${message}`->React.string} </li>
              )
              |> React.array}
            </ul>
          | None => React.null
          }}
          <form>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type_="text"
                placeholder="Email"
                value=email
                disabled=isBusy
                onChange={event => {
                  let email = ReactEvent.Form.target(event)["value"]
                  setData(prev =>
                    prev->AsyncData.map(((_email, password, error)) => (email, password, error))
                  )
                }}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type_="password"
                placeholder="Password"
                value=password
                disabled=isBusy
                onChange={event => {
                  let password = ReactEvent.Form.target(event)["value"]
                  setData(prev =>
                    prev->AsyncData.map(((email, _password, error)) => (email, password, error))
                  )
                }}
              />
            </fieldset>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              disabled=isBusy
              onClick={event => {
                event |> ReactEvent.Mouse.preventDefault
                event |> ReactEvent.Mouse.stopPropagation
                setData(AsyncData.toBusy)
                API.login(~email, ~password, ())
                |> Js.Promise.then_(x => {
                  switch x {
                  | Ok(user: Shape.User.t) =>
                    setUser(_prev => Some(user)->AsyncData.complete)
                    setData(AsyncData.toIdle)
                    Utils.setCookie("jwtToken", Some(user.token))
                    Link.home |> Link.push
                  | Error(AppError.Fetch((_code, _message, #json(json)))) =>
                    try {
                      let result =
                        json
                        ->Js.Json.decodeObject
                        ->Belt.Option.getExn
                        ->Js.Dict.get("errors")
                        ->Belt.Option.getExn
                        ->Shape.Login.decode
                      switch result {
                      | Ok(errors) =>
                        setData(prev =>
                          prev
                          ->AsyncData.toIdle
                          ->AsyncData.map(((email, password, _error)) => (email, password, errors))
                        )
                      | Error(_e) => ignore()
                      }
                    } catch {
                    | _ => Js.log("Button.SignIn: failed to decode json")
                    }
                  | Error(Fetch((_, _, #text(_)))) | Error(Decode(_)) => setData(AsyncData.toIdle)
                  }
                  Js.Promise.resolve()
                })
                |> ignore
              }}>
              {"Sign in" |> React.string}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
}
