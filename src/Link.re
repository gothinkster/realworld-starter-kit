type location';

external make: string => location' = "%identity";
external toString: location' => string = "%identity";

let home = make("/");
let settings = make("/#/settings");
let register = make("/#/register");
let login = make("/#/login");
let createArticle = make("/#/editor");
let editArticle = (~slug) => make(Printf.sprintf("/#/editor/%s", slug));
let article = (~slug) => make(Printf.sprintf("/#/article/%s", slug));
let profile = (~username) =>
  make(Printf.sprintf("/#/profile/%s", username));
let favorited = (~username) =>
  make(Printf.sprintf("/#/profile/%s/favorites", username));

[@react.component]
let make =
    (~className="", ~style=ReactDOMRe.Style.make(), ~location, ~children) => {
  let href = location->toString;

  <a
    className
    href
    style
    onClick={event =>
      if (Utils.isMouseRightClick(event)) {
        event->ReactEvent.Mouse.preventDefault;
        href->ReasonReactRouter.push;
      }
    }>
    children
  </a>;
};

module Button = {
  [@react.component]
  let make =
      (~className="", ~style=ReactDOMRe.Style.make(), ~location, ~children) => {
    let href = location->toString;

    <button
      className
      style
      onClick={event =>
        if (Utils.isMouseRightClick(event)) {
          event->ReactEvent.Mouse.preventDefault;
          href->ReasonReactRouter.push;
        }
      }>
      children
    </button>;
  };
};
