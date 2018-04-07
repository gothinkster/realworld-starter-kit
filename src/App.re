open Utils;

requireCSS("./App.css");

let logo = requireAssetURI("./logo.svg");

let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,
  render: _self =>
    <div className="App">
      <header className="App-header">
        <img src=logo className="App-logo" alt="logo" />
        <p>
          ("Edit " |> strEl)
          <code> ("src/App.re" |> strEl) </code>
          (" and save to reload." |> strEl)
        </p>
        <a
          className="App-link"
          href="https://reasonml.github.io/reason-react/"
          target="_blank"
          rel="noopener noreferrer">
          ("Learn ReasonReact" |> strEl)
        </a>
      </header>
    </div>,
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));
