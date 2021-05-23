@react.component
let make = (~data: array<string>) =>
  <ul className="tag-list">
    {data
    ->Js.Array2.map(tag =>
      <li key=tag className="tag-default tag-pill tag-outline"> {tag->React.string} </li>
    )
    ->React.array}
  </ul>
