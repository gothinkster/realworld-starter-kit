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
  | Complete(Error(_)) => "ERROR"->React.string
  | Reloading(Ok(comments)) | Complete(Ok(comments)) =>
    comments
    ->Js.Array2.map((comment: Shape.Comment.t) => {
      let isAPIBusy = Belt.Set.Int.has(busy, comment.id)

      <div className="card" key={comment.id->string_of_int}>
        <div className="card-block">
          <p className="card-text"> {comment.body->React.string} </p>
        </div>
        <div className="card-footer">
          <Link
            onClick={Link.profile(~username=comment.author.username)->Link.location}
            className="comment-author"
            style={ReactDOM.Style.make(~marginRight="7px", ())}>
            {switch comment.author.image {
            | "" => <img className="comment-author-img" />
            | src => <img src className="comment-author-img" />
            }}
          </Link>
          <Link
            onClick={Link.profile(~username=comment.author.username)->Link.location}
            className="comment-author">
            {comment.author.username->React.string}
          </Link>
          <span className="date-posted"> {comment.createdAt->Utils.formatDate->React.string} </span>
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
    ->React.array
  }
