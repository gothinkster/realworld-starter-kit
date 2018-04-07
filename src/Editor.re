open Utils;

let component = ReasonReact.statelessComponent("Editor");

let make = _children => {
  ...component,
  render: _self => <div> ("Editor" |> strEl) </div>,
};
