module Option = Belt.Option

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
