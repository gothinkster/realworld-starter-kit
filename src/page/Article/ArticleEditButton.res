module Option = Belt.Option

@react.component
let make = (~data) =>
  data
  ->AsyncResult.getOk
  ->Option.map((ok: Shape.Article.t) =>
    <Link
      className="btn btn-outline-secondary btn-sm"
      onClick={Link.editArticle(~slug=ok.slug)->Link.location}>
      <i className="ion-edit" style={ReactDOM.Style.make(~marginRight="5px", ())} />
      {"Edit Article"->React.string}
    </Link>
  )
  ->Option.getWithDefault(React.null)
