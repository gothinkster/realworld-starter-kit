open Relude.Globals;

module Decode = Decode.AsResult.OfParseError;

[@react.component]
let make =
    (
      ~user: Shape.User.t,
      ~setUser:
         (
           AsyncData.t(option(Shape.User.t)) =>
           AsyncData.t(option(Shape.User.t))
         ) =>
         unit,
    ) => {
  let (result, setResult) =
    React.useState(() => AsyncData.complete((user, "", None)));
  let isBusy = result |> AsyncData.isBusy;
  let (form, password, error) =
    result |> AsyncData.getValue |> Option.getOrElse((user, "", None));

  <div className="settings-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center"> "Your Settings"->React.string </h1>
          {switch (error) {
           | None => React.null
           | Some((error: Shape.Settings.t)) =>
             <ul className="error-messages">
               <DetailErrorMessage label="email" error={error.email} />
               <DetailErrorMessage label="bio" error={error.bio} />
               <DetailErrorMessage label="image" error={error.image} />
               <DetailErrorMessage label="username" error={error.username} />
               <DetailErrorMessage label="password" error={error.password} />
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
                  value={form.image}
                  onChange={event => {
                    let image = event->ReactEvent.Form.target##value;
                    setResult(
                      AsyncData.map(((use: Shape.User.t, password, error)) =>
                        ({...use, image}, password, error)
                      ),
                    );
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="text"
                  placeholder="Your Name"
                  disabled=isBusy
                  value={form.username}
                  onChange={event => {
                    let username = event->ReactEvent.Form.target##value;
                    setResult(
                      AsyncData.map(((user: Shape.User.t, password, error)) =>
                        ({...user, username}, password, error)
                      ),
                    );
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  rows=8
                  placeholder="Short bio about you"
                  disabled=isBusy
                  value={form.bio |> Option.getOrElse("")}
                  onChange={event => {
                    let bio = event->ReactEvent.Form.target##value;
                    setResult(
                      AsyncData.map(((user: Shape.User.t, password, error)) =>
                        ({...user, bio}, password, error)
                      ),
                    );
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="text"
                  placeholder="Email"
                  disabled=isBusy
                  value={form.email}
                  onChange={event => {
                    let email = event->ReactEvent.Form.target##value;
                    setResult(
                      AsyncData.map(((user: Shape.User.t, password, error)) =>
                        ({...user, email}, password, error)
                      ),
                    );
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
                    let password = event->ReactEvent.Form.target##value;
                    setResult(
                      AsyncData.map(((user, _password, error)) =>
                        (user, password, error)
                      ),
                    );
                  }}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                disabled=isBusy
                onClick={event => {
                  event |> ReactEvent.Mouse.preventDefault;
                  event |> ReactEvent.Mouse.stopPropagation;
                  result
                  |> AsyncData.tapComplete(((user, password, _error)) => {
                       setResult(AsyncData.toBusy);
                       API.updateUser(~user, ~password, ())
                       |> Js.Promise.then_(res => {
                            switch (res) {
                            | Ok(user) =>
                              setResult(prev =>
                                prev
                                |> AsyncData.toIdle
                                |> AsyncData.map(
                                     ((_user, _password, _error)) =>
                                     (user, "", None)
                                   )
                              );
                              setUser(AsyncData.map(_prev => Some(user)));
                            | Error(
                                Error.EFetch((_code, _message, `json(json))),
                              ) =>
                              json
                              |> Decode.field(
                                   "errors",
                                   Shape.Settings.decode,
                                 )
                              |> Result.tapOk(error =>
                                   setResult(prev =>
                                     prev
                                     |> AsyncData.toIdle
                                     |> AsyncData.map(
                                          ((user, _password, _error)) =>
                                          (user, "", Some(error))
                                        )
                                   )
                                 )
                              |> ignore
                            | Error(Error.EFetch((_, _, `text(_))))
                            | Error(EDecodeParseError(_)) => ignore()
                            };

                            ignore() |> Js.Promise.resolve;
                          })
                       |> ignore;
                     })
                  |> ignore;
                }}>
                "Update Settings"->React.string
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>;
};
