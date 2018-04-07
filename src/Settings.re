open Utils;

let component = ReasonReact.statelessComponent("Settings");

let make = _children => {
  ...component,
  render: _self => <div> ("Settings" |> strEl) </div>,
};
