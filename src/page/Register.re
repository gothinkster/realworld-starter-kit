open Relude.Globals;

module Decode = Decode.AsResult.OfParseError;

type t = {
  username: string,
  email: string,
  password: string,
};

let empty = ({username: "", email: "", password: ""}, None);

[@react.component]
let make = (~setUser) => {
  let (data, setData) = React.useState(() => AsyncData.complete(empty));
  let isBusy = data |> AsyncData.isBusy;
  let (form, error) = data |> AsyncData.getValue |> Option.getOrElse(empty);

  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center"> "Sign up"->React.string </h1>
          <p className="text-xs-center">
            <Link onClick={Link.login |> Link.location}>
              "Have an account?"->React.string
            </Link>
          </p>
          {switch (error) {
           | Some((detail: Shape.Register.t)) =>
             <ul className="error-messages">
               <ErrorDetails label="email" error={detail.email} />
               <ErrorDetails label="password" error={detail.password} />
               <ErrorDetails label="username" error={detail.username} />
             </ul>
           | None => React.null
           }}
          <form>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type_="text"
                placeholder="Your Name"
                disabled=isBusy
                value={form.username}
                onChange={event => {
                  let username = ReactEvent.Form.target(event)##value;
                  setData(
                    AsyncData.map(((form, error)) =>
                      ({...form, username}, error)
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
                  let email = ReactEvent.Form.target(event)##value;
                  setData(
                    AsyncData.map(((form, error)) =>
                      ({...form, email}, error)
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
                value={form.password}
                onChange={event => {
                  let password = ReactEvent.Form.target(event)##value;
                  setData(
                    AsyncData.map(((form, error)) =>
                      ({...form, password}, error)
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

                if (isBusy) {
                  ignore();
                } else {
                  setData(AsyncData.toBusy);
                  API.register(
                    ~username=form.username,
                    ~email=form.email,
                    ~password=form.password,
                    (),
                  )
                  |> Js.Promise.then_(
                       fun
                       | Ok((user: Shape.User.t)) => {
                           setUser(_prev =>
                             user |> Option.some |> AsyncData.complete
                           );
                           setData(AsyncData.toIdle);
                           Utils.setCookie("jwtToken", Some(user.token));
                           Link.home |> Link.push;
                           ignore() |> Js.Promise.resolve;
                         }
                       | Error(Error.Fetch((_code, _message, `json(json)))) =>
                         json
                         |> Decode.field("errors", Shape.Register.decode)
                         |> Result.tapOk(error =>
                              setData(prev =>
                                prev
                                |> AsyncData.toIdle
                                |> AsyncData.map(((form, _error)) =>
                                     (form, error |> Option.some)
                                   )
                              )
                            )
                         |> ignore
                         |> Js.Promise.resolve
                       | Error(Fetch((_, _, `text(_))))
                       | Error(Decode(_)) =>
                         setData(AsyncData.toIdle) |> Js.Promise.resolve,
                     )
                  |> ignore;
                };
              }}>
              "Sign up"->React.string
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>;
};
