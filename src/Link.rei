type location';

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

[@bs.obj]
external makeProps:
  (
    ~className: 'className=?,
    ~style: 'style=?,
    ~location: 'location,
    ~children: 'children,
    ~key: string=?,
    unit
  ) =>
  {
    .
    "children": 'children,
    "className": option('className),
    "style": option('style),
    "location": 'location,
  } =
  "";

let make:
  {
    .
    "children": ReasonReact.reactElement,
    "className": option(string),
    "style": option(ReactDOMRe.Style.t),
    "location": location',
  } =>
  ReasonReact.reactElement;

module Button: {
  [@bs.obj]
  external makeProps:
    (
      ~className: 'className=?,
      ~style: 'style=?,
      ~location: 'location,
      ~children: 'children,
      ~key: string=?,
      unit
    ) =>
    {
      .
      "children": 'children,
      "className": option('className),
      "style": option('style),
      "location": 'location,
    } =
    "";

  let make:
    {
      .
      "children": ReasonReact.reactElement,
      "className": option(string),
      "style": option(ReactDOMRe.Style.t),
      "location": location',
    } =>
    ReasonReact.reactElement;
};
