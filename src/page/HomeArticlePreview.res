@react.component
let make = (~data: Shape.Article.t, ~onToggleFavorite, ~isFavoriteBusy) =>
  <div className="article-preview">
    <div className="article-meta">
      <Link onClick={Link.profile(~username=data.author.username)->Link.location}>
        <img src=data.author.image />
      </Link>
      <div className="info">
        <Link
          className="author" onClick={Link.profile(~username=data.author.username)->Link.location}>
          {data.author.username->React.string}
        </Link>
        <span className="date"> {data.createdAt->Js.Date.toLocaleString->React.string} </span>
      </div>
      <button
        className={data.favorited
          ? "btn btn-primary btn-sm pull-xs-right"
          : "btn btn-outline-primary btn-sm pull-xs-right"}
        disabled={isFavoriteBusy}
        onClick={_event =>
          onToggleFavorite(
            ~action=data.favorited
              ? API.Action.Unfavorite(data.slug)
              : API.Action.Favorite(data.slug),
          )}>
        <i
          className={isFavoriteBusy ? "ion-load-a" : "ion-heart"}
          style={ReactDOM.Style.make(~marginRight="3px", ())}
        />
        {data.favoritesCount->Js.Int.toString->React.string}
      </button>
    </div>
    <Link onClick={Link.article(~slug=data.slug)->Link.location} className="preview-link">
      <h1> {data.title->React.string} </h1>
      <p> {data.description->React.string} </p>
      <span> {"Read more..."->React.string} </span>
    </Link>
  </div>
