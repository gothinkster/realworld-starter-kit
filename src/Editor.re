open Utils;

let component = ReasonReact.statelessComponent("Editor");

let make = _children => {
  ...component,
  render: _self =>
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    _type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    _type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows=8
                    placeholder="Write your article (in markdown)"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    _type="text"
                    className="form-control"
                    placeholder="Enter tags"
                  />
                  <div className="tag-list" />
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  _type="button">
                  ("Publish Article" |> strEl)
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>,
};
