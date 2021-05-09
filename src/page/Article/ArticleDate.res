module Option = Belt.Option

@react.component
let make = (~article) =>
  article
  ->AsyncResult.getOk
  ->Option.map((ok: Shape.Article.t) => ok.createdAt)
  ->Option.map(createdAt => createdAt |> Utils.formatDate |> React.string)
  ->Option.getWithDefault(React.null)
