type location';

type onClickAction =
  | Location(location')
  | CustomFn(unit => unit);

let customFn = fn => CustomFn(fn);
let location = location => Location(location);

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

let availableIf: (bool, onClickAction) => onClickAction =
  (available, target) => available ? target : CustomFn(ignore);

let handleClick = (onClick, event) => {
  switch (onClick) {
  | Location(location) =>
    if (Utils.isMouseRightClick(event)) {
      event->ReactEvent.Mouse.preventDefault;
      location->toString->ReasonReactRouter.push;
    }
  | CustomFn(fn) => fn()
  };
  ignore();
};

[@react.component]
let make =
    (~className="", ~style=ReactDOMRe.Style.make(), ~onClick, ~children) => {
  let href =
    switch (onClick) {
    | Location(location) => Some(location |> toString)
    | CustomFn(_fn) => None
    };
  <a className ?href style onClick={handleClick(onClick)}> children </a>;
};

module Button = {
  [@react.component]
  let make =
      (
        ~className="",
        ~style=ReactDOMRe.Style.make(),
        ~onClick,
        ~disabled=false,
        ~children,
      ) => {
    <button className style onClick={handleClick(onClick)}>
      children
    </button>;
  };
};
