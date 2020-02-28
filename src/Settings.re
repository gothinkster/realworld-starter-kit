open Relude.Globals;

[@react.component]
let make = (~user: Shape.User.t) => {
  let (result, setResult) =
    React.useState(() => AsyncResult.completeOk((user, "")));
  let isBusy = result |> AsyncResult.isBusy;
  let (form, password) =
    result |> AsyncResult.getOk |> Option.getOrElse((user, ""));

  <div className="settings-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center"> "Your Settings"->React.string </h1>
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
                      AsyncResult.map(
                        ((prevForm: Shape.User.t, prevPassword)) =>
                        ({...prevForm, image}, prevPassword)
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
                      AsyncResult.map(
                        ((prevForm: Shape.User.t, prevPassword)) =>
                        ({...prevForm, username}, prevPassword)
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
                      AsyncResult.map(
                        ((prevForm: Shape.User.t, prevPassword)) =>
                        ({...prevForm, bio}, prevPassword)
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
                      AsyncResult.map(
                        ((prevForm: Shape.User.t, prevPassword)) =>
                        ({...prevForm, email}, prevPassword)
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
                      AsyncResult.map(((prevForm, _prevPassword)) =>
                        (prevForm, password)
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
                  |> AsyncResult.tapOk(((form, password)) => {
                       setResult(AsyncResult.toBusy);
                       API.updateUser(~user=form, ~password, ())
                       |> Js.Promise.then_(res =>
                            Js.log2("ok", res) |> Js.Promise.resolve
                          )
                       |> Js.Promise.catch(err =>
                            Js.log2("error", err) |> Js.Promise.resolve
                          )
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
