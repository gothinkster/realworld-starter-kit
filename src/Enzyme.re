type reactWrapper;

type reactElement = ReasonReact.reactElement;

[@bs.module "enzyme"] external mount: reactElement => reactWrapper = "";
