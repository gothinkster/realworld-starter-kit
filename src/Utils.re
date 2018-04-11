let strEl = ReasonReact.stringToElement;

let arrayEl = ReasonReact.arrayToElement;

let nullEl = ReasonReact.nullElement;

[@bs.val] external requireCSS : string => unit = "require";

[@bs.val] external requireAssetURI : string => string = "require";

let id = a => a;
