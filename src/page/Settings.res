@react.component
let make = (
  ~user: Shape.User.t,
  ~setUser: (AsyncData.t<option<Shape.User.t>> => AsyncData.t<option<Shape.User.t>>) => unit,
) => {
  let (result, setResult) = React.useState(() => AsyncData.complete((user, "", None)))
  let isBusy = result |> AsyncData.isBusy
  let (form, password, error) =
    result->AsyncData.getValue->Belt.Option.getWithDefault((user, "", None))

  <div className="settings-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center"> {"Your Settings" |> React.string} </h1>
          {switch error {
          | None => React.null
          | Some(error: Shape.Settings.t) =>
            <ul className="error-messages">
              <ErrorDetails label="email" error=error.email />
              <ErrorDetails label="bio" error=error.bio />
              <ErrorDetails label="image" error=error.image />
              <ErrorDetails label="username" error=error.username />
              <ErrorDetails label="password" error=error.password />
            </ul>
          }}
          <form>
            <fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control"
                  type_="text"
                  placeholder="URL of profile picture"
                  disabled=isBusy
                  value={form.image->Belt.Option.getWithDefault("")}
                  onChange={event => {
                    let image = ReactEvent.Form.target(event)["value"]
                    setResult(
                      AsyncData.map(((use: Shape.User.t, password, error)) => (
                        {...use, image: image},
                        password,
                        error,
                      )),
                    )
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="text"
                  placeholder="Your Name"
                  disabled=isBusy
                  value=form.username
                  onChange={event => {
                    let username = ReactEvent.Form.target(event)["value"]
                    setResult(
                      AsyncData.map(((user: Shape.User.t, password, error)) => (
                        {...user, username: username},
                        password,
                        error,
                      )),
                    )
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  rows=8
                  placeholder="Short bio about you"
                  disabled=isBusy
                  value={form.bio->Belt.Option.getWithDefault("")}
                  onChange={event => {
                    let bio = ReactEvent.Form.target(event)["value"]
                    setResult(
                      AsyncData.map(((user: Shape.User.t, password, error)) => (
                        {...user, bio: bio},
                        password,
                        error,
                      )),
                    )
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="text"
                  placeholder="Email"
                  disabled=isBusy
                  value=form.email
                  onChange={event => {
                    let email = ReactEvent.Form.target(event)["value"]
                    setResult(
                      AsyncData.map(((user: Shape.User.t, password, error)) => (
                        {...user, email: email},
                        password,
                        error,
                      )),
                    )
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="password"
                  placeholder="Password"
                  disabled=isBusy
                  value=password
                  onChange={event => {
                    let password = ReactEvent.Form.target(event)["value"]
                    setResult(AsyncData.map(((user, _password, error)) => (user, password, error)))
                  }}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                disabled=isBusy
                onClick={event => {
                  event |> ReactEvent.Mouse.preventDefault
                  event |> ReactEvent.Mouse.stopPropagation
                  result
                  |> AsyncData.tapComplete(((user, password, _error)) => {
                    setResult(AsyncData.toBusy)
                    API.updateUser(~user, ~password, ())
                    |> Js.Promise.then_(res => {
                      switch res {
                      | Ok(user) =>
                        setResult(prev =>
                          prev
                          |> AsyncData.toIdle
                          |> AsyncData.map(((_user, _password, _error)) => (user, "", None))
                        )
                        setUser(AsyncData.map(_prev => Some(user)))
                      | Error(AppError.Fetch((_code, _message, #json(json)))) =>
                        try {
                          let result =
                            json
                            ->Js.Json.decodeObject
                            ->Belt.Option.getExn
                            ->Js.Dict.get("errors")
                            ->Belt.Option.getExn
                            ->Shape.Settings.decode
                          switch result {
                          | Ok(errors) =>
                            setResult(prev =>
                              prev
                              |> AsyncData.toIdle
                              |> AsyncData.map(((user, _password, _error)) => (
                                user,
                                "",
                                Some(errors),
                              ))
                            )
                          | Error(_e) => ignore()
                          }
                        } catch {
                        | _ =>
                          Js.log("Button.UpdateSettings: failed to decode json")
                          ignore()
                        }
                      | Error(Fetch((_, _, #text(_)))) | Error(Decode(_)) => ignore()
                      }

                      ignore() |> Js.Promise.resolve
                    })
                    |> ignore
                  })
                  |> ignore
                }}>
                {"Update Settings" |> React.string}
              </button>
            </fieldset>
          </form>
          <hr />
          <button
            className="btn btn-outline-danger"
            disabled=isBusy
            onClick={event => {
              event |> ReactEvent.Mouse.preventDefault
              event |> ReactEvent.Mouse.stopPropagation
              if isBusy {
                ignore()
              } else {
                setUser(_prev => AsyncData.complete(None))
                Utils.deleteCookie("jwtToken")
                Link.home |> Link.push
              }
            }}>
            {"Or click here to logout." |> React.string}
          </button>
        </div>
      </div>
    </div>
  </div>
}
