module Option = Belt.Option

@react.component
let make = (~article) =>
  article
  ->AsyncResult.getOk
  ->Option.map((ok: Shape.Article.t) => ok.author)
  ->Option.map((author: Shape.Author.t) =>
    <Link onClick={Link.profile(~username=author.username) |> Link.location}>
      {switch author.image {
      | "" => <img />
      | src => <img src />
      }}
    </Link>
  )
  ->Option.getWithDefault(React.null)
