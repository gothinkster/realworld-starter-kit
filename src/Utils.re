let strEl = ReasonReact.stringToElement;

let arrEl = ReasonReact.arrayToElement;

let nullEl = ReasonReact.nullElement;

[@bs.val] external requireCSS : string => unit = "require";

[@bs.val] external requireAssetURI : string => string = "require";
