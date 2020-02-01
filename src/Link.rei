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
    ~location: 'location,
    ~children: 'children,
    ~key: string=?,
    unit
  ) =>
  {
    .
    "children": 'children,
    "className": option('className),
    "location": 'location,
  } =
  "";

let make:
  {
    .
    "children": ReasonReact.reactElement,
    "className": option(string),
    "location": location',
  } =>
  ReasonReact.reactElement;
