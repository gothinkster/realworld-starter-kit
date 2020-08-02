open Relude.Globals

module Decode = Decode.AsResult.OfParseError

@react.component
let make = (~setUser) => {
  let (data, setData) = React.useState(() => AsyncData.complete(("", "", None)))
  let isBusy = data |> AsyncData.isBusy
  let (email, password, error) = data |> AsyncData.getValue |> Option.getOrElse(("", "", None))

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
                <li key=message>
                  {Printf.sprintf("email or password %s", message) |> React.string}
                </li>
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
                  setData(AsyncData.map(((_email, password, error)) => (email, password, error)))
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
                  setData(AsyncData.map(((email, _password, error)) => (email, password, error)))
                }}
              />
            </fieldset>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              disabled=isBusy
              onClick={event => {
                event |> ReactEvent.Mouse.preventDefault
                event |> ReactEvent.Mouse.stopPropagation
                if isBusy {
                  ignore()
                } else {
                  setData(AsyncData.toBusy)
                  API.login(~email, ~password, ()) |> Js.Promise.then_(x =>
                    switch x {
                    | Ok(user: Shape.User.t) =>
                      setUser(_prev => user |> Option.some |> AsyncData.complete)
                      setData(AsyncData.toIdle)
                      Utils.setCookie("jwtToken", Some(user.token))
                      Link.home |> Link.push
                      ignore() |> Js.Promise.resolve
                    | Error(Error.Fetch((_code, _message, #json(json)))) =>
                      json
                      |> Decode.field("errors", Shape.Login.decode)
                      |> Result.tapOk(error =>
                        setData(prev =>
                          prev
                          |> AsyncData.toIdle
                          |> AsyncData.map(((email, password, _error)) => (email, password, error))
                        )
                      )
                      |> ignore
                      |> Js.Promise.resolve
                    | Error(Fetch((_, _, #text(_)))) | Error(Decode(_)) =>
                      setData(AsyncData.toIdle) |> Js.Promise.resolve
                    }
                  ) |> ignore
                }
              }}>
              {"Sign in" |> React.string}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
}
