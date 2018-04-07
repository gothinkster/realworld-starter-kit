open Utils;

let component = ReasonReact.statelessComponent("Sign");

let make = (~register, _children) => {
  ...component,
  render: _self => <div> ((register ? "Register" : "Login") |> strEl) </div>,
};
