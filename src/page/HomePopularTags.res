@react.component
let make = (~data: AsyncResult.t<Shape.Tags.t, AppError.t>, ~onClick) => <>
  <p> {"Popular Tags" |> React.string} </p>
  <WithTestId id="tag-list">
    <div className="tag-list">
      {switch data {
      | Init => React.string("Initilizing...")
      | Loading => React.string("Loading...")
      | Reloading(Ok(tags)) | Complete(Ok(tags)) =>
        tags
        |> Js.Array.map(tag =>
          <a
            key=tag
            href="#"
            className="tag-pill tag-default"
            onClick={event =>
              if Utils.isMouseRightClick(event) {
                event |> ReactEvent.Mouse.preventDefault
                tag |> onClick |> ignore
              }}>
            {tag |> React.string}
          </a>
        )
        |> React.array
      | Reloading(Error(_error)) | Complete(Error(_error)) => React.string("ERROR")
      }}
    </div>
  </WithTestId>
</>
