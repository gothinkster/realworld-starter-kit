@react.component
let make = (~limit: int, ~offset: int, ~total: int, ~onClick: int => unit) =>
  if total == 0 {
    React.null
  } else {
    let pages = Js.Math.ceil(float_of_int(total) /. float_of_int(limit)) - 1

    <WithTestId id="page-link">
      <ul className="pagination">
        {Belt.Array.range(0, pages)
        |> Array.map(page => {
          let className = if (offset == 0 && page == 0) || page == offset / limit {
            "page-item active"
          } else {
            "page-item"
          }

          <li key={page |> string_of_int} className>
            <a
              className="page-link"
              href={`#${page->Belt.Int.toString}`}
              onClick={event =>
                if Utils.isMouseRightClick(event) {
                  event |> ReactEvent.Mouse.preventDefault
                  onClick(page * limit)
                }}>
              {string_of_int(page + 1) |> React.string}
            </a>
          </li>
        })
        |> React.array}
      </ul>
    </WithTestId>
  }
