module Option = Belt.Option

module PostComment = {
  @react.component
  let make = (
    ~slug: string,
    ~image: string,
    ~setComments: (
      AsyncResult.t<array<Shape.Comment.t>, AppError.t> => AsyncResult.t<
        array<Shape.Comment.t>,
        AppError.t,
      >
    ) => unit,
  ) => {
    let (comment, setComment) = React.useState(() => AsyncData.complete(""))
    let isCommentValid =
      comment
      ->AsyncData.getValue
      ->Option.map(v => Js.String.trim(v) != "")
      ->Option.getWithDefault(false)
    let body = comment->AsyncData.getValue->Option.getWithDefault("")

    <form className="card comment-form">
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows=3
          value=body
          onChange={event => {
            let value = ReactEvent.Form.target(event)["value"]
            setComment(_prev => AsyncData.complete(value))
          }}
          disabled={comment |> AsyncData.isBusy}
        />
      </div>
      <div className="card-footer">
        {switch image {
        | "" => <img className="comment-author-img" />
        | src => <img src className="comment-author-img" />
        }}
        <button
          className="btn btn-sm btn-primary"
          disabled={!isCommentValid}
          onClick={event => {
            if isCommentValid && AsyncData.isComplete(comment) {
              setComment(AsyncData.toBusy)
              API.addComment(~slug, ~body, ())
              |> Js.Promise.then_(x =>
                switch x {
                | Ok(comment) =>
                  setComments(prev =>
                    prev->AsyncResult.map(comments => {
                      let _ = comments->Js.Array2.unshift(comment)
                      comments
                    })
                  )
                  setComment(_prev => AsyncData.complete(""))
                  ignore() |> Js.Promise.resolve
                | Error(_error) => setComment(AsyncData.toIdle) |> Js.Promise.resolve
                }
              )
              |> Js.Promise.catch(_error => setComment(AsyncData.toIdle) |> Js.Promise.resolve)
              |> ignore
            }
            event |> ReactEvent.Mouse.preventDefault
            event |> ReactEvent.Mouse.stopPropagation
          }}>
          {"Post Comment" |> React.string}
        </button>
      </div>
    </form>
  }
}

module TagList = {
  @react.component
  let make = (~data: array<string>) =>
    <ul className="tag-list">
      {data
      |> Array.map(tag =>
        <li key=tag className="tag-default tag-pill tag-outline"> {tag |> React.string} </li>
      )
      |> React.array}
    </ul>
}

module Comments = {
  @react.component
  let make = (
    ~slug: string,
    ~data: AsyncResult.t<array<Shape.Comment.t>, AppError.t>,
    ~user: option<Shape.User.t>,
    ~onDeleteClick: (~slug: string, ~id: int) => unit,
    ~busy: Belt.Set.Int.t,
  ) =>
    switch data {
    | Init | Loading | Reloading(Error(_)) => <Spinner />
    | Complete(Error(_)) => "ERROR" |> React.string
    | Reloading(Ok(comments)) | Complete(Ok(comments)) =>
      comments
      |> Array.map((comment: Shape.Comment.t) => {
        let isAPIBusy = Belt.Set.Int.has(busy, comment.id)

        <div className="card" key={comment.id |> string_of_int}>
          <div className="card-block">
            <p className="card-text"> {comment.body |> React.string} </p>
          </div>
          <div className="card-footer">
            <Link
              onClick={Link.profile(~username=comment.author.username) |> Link.location}
              className="comment-author"
              style={ReactDOM.Style.make(~marginRight="7px", ())}>
              {switch comment.author.image {
              | "" => <img className="comment-author-img" />
              | src => <img src className="comment-author-img" />
              }}
            </Link>
            <Link
              onClick={Link.profile(~username=comment.author.username) |> Link.location}
              className="comment-author">
              {comment.author.username |> React.string}
            </Link>
            <span className="date-posted">
              {comment.createdAt |> Utils.formatDate |> React.string}
            </span>
            <span className="mod-options">
              {
                // TODO: implement "edit" icon
                false ? <i className="ion-edit" /> : React.null
              }
              {switch user {
              | Some({username}) if username == comment.author.username =>
                <i
                  className={isAPIBusy ? "ion-load-a" : "ion-trash-a"}
                  onClick={event =>
                    if !isAPIBusy && Utils.isMouseRightClick(event) {
                      onDeleteClick(~slug, ~id=comment.id)
                    }}
                />
              | Some(_) | None => React.null
              }}
            </span>
          </div>
        </div>
      })
      |> React.array
    }
}

module EditArticleButton = {
  @react.component
  let make = (~data) =>
    data
    ->AsyncResult.getOk
    ->Option.map((ok: Shape.Article.t) =>
      <Link
        className="btn btn-outline-secondary btn-sm"
        onClick={Link.editArticle(~slug=ok.slug) |> Link.location}>
        <i className="ion-edit" style={ReactDOM.Style.make(~marginRight="5px", ())} />
        {"Edit Article" |> React.string}
      </Link>
    )
    ->Option.getWithDefault(React.null)
}

module DeleteArticleButton = {
  @react.component
  let make = (~isBusy, ~onClick) =>
    <Link.Button
      className="btn btn-outline-danger btn-sm"
      onClick
      style={ReactDOM.Style.make(~marginLeft="5px", ())}>
      <i
        className={isBusy ? "ion-load-a" : "ion-trash-a"}
        style={ReactDOM.Style.make(~marginRight="5px", ())}
      />
      {"Delete Article" |> React.string}
    </Link.Button>
}

module FavoriteButton = {
  @react.component
  let make = (~data: AsyncData.t<(bool, int, string)>, ~onClick: Link.onClickAction) =>
    <Link.Button
      className={switch data {
      | Init
      | Loading
      | Reloading((false, _, _))
      | Complete((false, _, _)) => "btn btn-sm btn-outline-primary"
      | Reloading((true, _, _)) | Complete((true, _, _)) => "btn btn-sm btn-primary"
      }}
      style={ReactDOM.Style.make(~marginLeft="5px", ())}
      onClick={switch data {
      | Init | Loading | Reloading((_, _, _)) => Link.customFn(ignore)
      | Complete((_, _, _)) => onClick
      }}>
      <i
        className={AsyncData.isBusy(data) ? "ion-load-a" : "ion-heart"}
        style={ReactDOM.Style.make(~marginRight="5px", ())}
      />
      {switch data {
      | Init | Loading => React.null
      | Reloading((favorited, favoritesCount, _slug))
      | Complete((favorited, favoritesCount, _slug)) => <>
          {(favorited ? "Unfavorite Article " : "Favorite Article ") |> React.string}
          <span className="counter">
            {Printf.sprintf("(%d)", favoritesCount) |> React.string}
          </span>
        </>
      }}
    </Link.Button>
}

module FollowButton = {
  @react.component
  let make = (~data: AsyncData.t<(string, bool)>, ~onClick: Link.onClickAction) =>
    <Link.Button
      className={switch data {
      | Init
      | Loading
      | Reloading((_, false))
      | Complete((_, false)) => "btn btn-sm btn-outline-secondary"
      | Reloading((_, true)) | Complete((_, true)) => "btn btn-sm btn-secondary"
      }}
      onClick={switch data {
      | Init | Loading | Reloading((_, _)) => Link.customFn(ignore)
      | Complete((_, _)) => onClick
      }}>
      <i
        className={AsyncData.isBusy(data) ? "ion-load-a" : "ion-plus-round"}
        style={ReactDOM.Style.make(~marginRight="5px", ())}
      />
      {switch data {
      | Init | Loading => React.null
      | Reloading((username, following)) | Complete((username, following)) =>
        Printf.sprintf("%s %s", following ? "Unfollow" : "Follow", username) |> React.string
      }}
    </Link.Button>
}

module ArticleDate = {
  @react.component
  let make = (~article) =>
    article
    ->AsyncResult.getOk
    ->Option.map((ok: Shape.Article.t) => ok.createdAt)
    ->Option.map(createdAt => createdAt |> Utils.formatDate |> React.string)
    ->Option.getWithDefault(React.null)
}

module ArticleAuthorName = {
  @react.component
  let make = (~article) =>
    article
    ->AsyncResult.getOk
    ->Option.map((ok: Shape.Article.t) => ok.author)
    ->Option.map((author: Shape.Author.t) =>
      <Link onClick={Link.profile(~username=author.username) |> Link.location} className="author">
        {author.username |> React.string}
      </Link>
    )
    ->Option.getWithDefault(React.null)
}

module ArticleAuthorAvatar = {
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
}

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
            ? <EditArticleButton data=article />
            : <FollowButton data=follow onClick=onFollowClick />}
          {isAuthor
            ? <DeleteArticleButton isBusy=isDeleteBusy onClick=onDeleteClick />
            : <FavoriteButton data=favorite onClick=onFavoriteClick />}
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
          | Reloading(Ok({tagList})) | Complete(Ok({tagList})) => <TagList data=tagList />
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
            ? <EditArticleButton data=article />
            : <FollowButton data=follow onClick=onFollowClick />}
          {isAuthor
            ? <DeleteArticleButton isBusy=isDeleteBusy onClick=onDeleteClick />
            : <FavoriteButton data=favorite onClick=onFavoriteClick />}
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          {switch user {
          | Some({image}) =>
            <PostComment image={image->Option.getWithDefault("")} slug setComments />
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
          <Comments slug data=comments busy=busyComments user onDeleteClick=deleteComment />
        </div>
      </div>
    </div>
  </div>
}
