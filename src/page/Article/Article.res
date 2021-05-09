module Option = Belt.Option

@react.component
let make = (~slug: string, ~user: option<Shape.User.t>) => {
  let (articleAndTagList, _setArticle) = Hook.useArticle(~slug)
  let article = articleAndTagList->AsyncResult.map(((article, _tagList, _editor)) => article)
  let (comments, busyComments, deleteComment, setComments) = Hook.useComments(~slug)
  let (follow, onFollowClick) = Hook.useFollow(~article, ~user)
  let (favorite, onFavoriteClick) = Hook.useFavorite(~article, ~user)
  let (isDeleteBusy, onDeleteClick) = Hook.useDeleteArticle(~article, ~user)
  let isAuthor = switch (user, article) {
  | (Some(u), Reloading(Ok(a)) | Complete(Ok(a))) => u.username == a.author.username
  | (Some(_), Init | Loading | Reloading(Error(_)) | Complete(Error(_)))
  | (None, Init | Loading | Reloading(_) | Complete(_)) => false
  }

  <div className="article-page">
    <div className="banner">
      <div className="container">
        <h1>
          {article
          ->AsyncResult.getOk
          ->Option.map((ok: Shape.Article.t) => ok.title)
          ->Option.map(title => title |> React.string)
          ->Option.getWithDefault(React.null)}
        </h1>
        <div className="article-meta">
          <ArticleAuthorAvatar article />
          <div className="info">
            <ArticleAuthorName article /> <span className="date"> <ArticleDate article /> </span>
          </div>
          {isAuthor
            ? <ArticleEditButton data=article />
            : <ArticleFollowButton data=follow onClick=onFollowClick />}
          {isAuthor
            ? <ArticleDeleteButton isBusy=isDeleteBusy onClick=onDeleteClick />
            : <ArticleFavoriteButton data=favorite onClick=onFavoriteClick />}
        </div>
      </div>
    </div>
    <div className="container page">
      <div className="row article-content">
        <div className="col-md-12">
          <div style={ReactDOM.Style.make(~marginBottom="2rem", ())}>
            {switch article {
            | Init | Loading => <Spinner />
            | Reloading(Ok({body})) | Complete(Ok({body})) =>
              <div
                dangerouslySetInnerHTML={
                  "__html": EscapeHatch.markdownToHtml(body),
                }
              />
            | Reloading(Error(_error)) | Complete(Error(_error)) => "ERROR" |> React.string
            }}
          </div>
          {switch article {
          | Init | Loading | Reloading(Error(_)) | Complete(Error(_)) => React.null
          | Reloading(Ok({tagList})) | Complete(Ok({tagList})) => <ArticleTagList data=tagList />
          }}
        </div>
      </div>
      <hr />
      <div className="article-actions">
        <div className="article-meta">
          <ArticleAuthorAvatar article />
          <div className="info">
            <ArticleAuthorName article /> <span className="date"> <ArticleDate article /> </span>
          </div>
          {isAuthor
            ? <ArticleEditButton data=article />
            : <ArticleFollowButton data=follow onClick=onFollowClick />}
          {isAuthor
            ? <ArticleDeleteButton isBusy=isDeleteBusy onClick=onDeleteClick />
            : <ArticleFavoriteButton data=favorite onClick=onFavoriteClick />}
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          {switch user {
          | Some({image}) =>
            <ArticlePostComment image={image->Option.getWithDefault("")} slug setComments />
          | None =>
            <p>
              <Link className="nav-link" onClick={Link.login |> Link.location}>
                {"Sign in" |> React.string}
              </Link>
              {" or " |> React.string}
              <Link className="nav-link" onClick={Link.register |> Link.location}>
                {"sign up" |> React.string}
              </Link>
              {" to add comments on this article." |> React.string}
            </p>
          }}
          <ArticleComments slug data=comments busy=busyComments user onDeleteClick=deleteComment />
        </div>
      </div>
    </div>
  </div>
}
