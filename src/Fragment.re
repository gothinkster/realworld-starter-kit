[@bs.module "react"] external reactClass : ReasonReact.reactClass = "Fragment";

let make = children =>
  ReasonReact.wrapJsForReason(~reactClass, ~props=Js.Obj.empty(), children);
