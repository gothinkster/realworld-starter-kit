type location';

type onClickAction =
  | Location(location')
  | CustomFn(unit => unit);

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

let push: location' => unit =
  location => {
    location->toString->ReasonReactRouter.push;
  };

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
  let customFn = fn => CustomFn(fn);

  [@react.component]
  let make =
      (
        ~className="",
        ~style=ReactDOMRe.Style.make(),
        ~onClick,
        ~disabled=false,
        ~children,
      ) => {
    <button
      className
      style
      onClick={event => {
        switch (onClick) {
        | Location(location) =>
          if (Utils.isMouseRightClick(event)) {
            event->ReactEvent.Mouse.preventDefault;
            location->toString->ReasonReactRouter.push;
          }
        | CustomFn(fn) => fn()
        };
        ignore();
      }}>
      children
    </button>;
  };
};
