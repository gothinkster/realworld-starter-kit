open Utils;

let component = ReasonReact.statelessComponent("Profile");

let make = _children => {
  ...component,
  render: _self => <div> ("Profile" |> strEl) </div>,
};
