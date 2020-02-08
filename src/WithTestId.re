// source code from https://github.com/reasonml/reason-react/issues/230#issuecomment-562446425
[@react.component]
let make = (~id: string, ~children) =>
  ReasonReact.cloneElement(children, ~props={"data-testid": id}, [||]);
