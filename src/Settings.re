open Utils;

let component = ReasonReact.statelessComponent("Settings");

let make = _children => {
  ...component,
  render: _self =>
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center"> ("Your Settings" |> strEl) </h1>
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    _type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    _type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows=8
                    placeholder="Short bio about you"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    _type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    _type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  ("Update Settings" |> strEl)
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>,
};
