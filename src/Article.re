open Utils;

let component = ReasonReact.statelessComponent("Article");

let make = _children => {
  ...component,
  render: _self => <div> ("Article" |> strEl) </div>,
};
