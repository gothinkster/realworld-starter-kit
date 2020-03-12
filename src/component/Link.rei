type location';

type onClickAction =
  | Location(location')
  | CustomFn(unit => unit);

let customFn: (unit => unit) => onClickAction;
let location: location' => onClickAction;

external toString: location' => string = "%identity";

let home: location';
let settings: location';
let register: location';
let login: location';
let createArticle: location';
let editArticle: (~slug: string) => location';
let article: (~slug: string) => location';
let profile: (~username: string) => location';
let favorited: (~username: string) => location';

let push: location' => unit;
let availableIf: (bool, onClickAction) => onClickAction;

[@bs.obj]
external makeProps:
  (
    ~className: 'className=?,
    ~style: 'style=?,
    ~onClick: 'onClick,
    ~children: 'children,
    ~key: string=?,
    unit
  ) =>
  {
    .
    "children": 'children,
    "className": option('className),
    "style": option('style),
    "onClick": 'onClick,
  } =
  "";

let make:
  {
    .
    "children": ReasonReact.reactElement,
    "className": option(string),
    "style": option(ReactDOMRe.Style.t),
    "onClick": onClickAction,
  } =>
  ReasonReact.reactElement;

module Button: {
  [@bs.obj]
  external makeProps:
    (
      ~className: 'className=?,
      ~style: 'style=?,
      ~onClick: 'onClick,
      ~disabled: 'disabled=?,
      ~children: 'children,
      ~key: string=?,
      unit
    ) =>
    {
      .
      "children": 'children,
      "className": option('className),
      "disabled": option('disabled),
      "onClick": 'onClick,
      "style": option('style),
    } =
    "";

  let make:
    {
      .
      "className": option(string),
      "style": option(ReactDOMRe.Style.t),
      "onClick": onClickAction,
      "disabled": option(bool),
      "children": ReasonReact.reactElement,
    } =>
    ReasonReact.reactElement;
};
