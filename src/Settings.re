open Relude.Globals;

[@react.component]
let make = (~user: Shape.User.t) => {
  let ((form, password), setForm) = React.useState(() => (user, ""));

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
                  value={form.image}
                  onChange={event => {
                    let image = event->ReactEvent.Form.target##value;
                    setForm(((prevForm, prevPassword)) =>
                      ({...prevForm, image}, prevPassword)
                    );
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="text"
                  placeholder="Your Name"
                  value={form.username}
                  onChange={event => {
                    let username = event->ReactEvent.Form.target##value;
                    setForm(((prevForm, prevPassword)) =>
                      ({...prevForm, username}, prevPassword)
                    );
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  rows=8
                  placeholder="Short bio about you"
                  value={form.bio |> Option.getOrElse("")}
                  onChange={event => {
                    let bio = event->ReactEvent.Form.target##value;
                    setForm(((prevForm, prevPassword)) =>
                      ({...prevForm, bio}, prevPassword)
                    );
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="text"
                  placeholder="Email"
                  value={form.email}
                  onChange={event => {
                    let email = event->ReactEvent.Form.target##value;
                    setForm(((prevForm, prevPassword)) =>
                      ({...prevForm, email}, prevPassword)
                    );
                  }}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type_="password"
                  placeholder="Password"
                  value=password
                  onChange={event => {
                    let password = event->ReactEvent.Form.target##value;
                    setForm(((prevForm, _prevPassword)) =>
                      (prevForm, password)
                    );
                  }}
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                "Update Settings"->React.string
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>;
};
