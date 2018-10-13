open Utils;

let component = ReasonReact.statelessComponent("Pagination");

let make = (~currentPage, ~totalCount, ~perPage, ~onPageClick, _children) => {
  ...component,
  render: _self =>
    <nav>
      <ul className="pagination">
        {
          (totalCount /. perPage |> ceil |> int_of_float)
          ->(Belt.List.makeBy(i => i + 1))
          ->(
              Belt.List.mapU((. page) => {
                let key = page |> string_of_int;
                <li
                  key
                  className={
                    "page-item" ++ (page === currentPage ? " active" : "")
                  }
                  onClick={
                    event => {
                      event->ReactEvent.Mouse.preventDefault;
                      onPageClick(page);
                    }
                  }>
                  <a className="page-link" href={"#" ++ key}>
                    {key |> strEl}
                  </a>
                </li>;
              })
            )
          |> Belt.List.toArray
          |> arrayEl
        }
      </ul>
    </nav>,
};
