@react.component
let make = (~label: string, ~error: option<array<string>>) =>
  error
  ->Belt.Option.map(message =>
    message
    ->Js.Array2.map(message =>
      <li key=message> {Printf.sprintf("%s %s", label, message) |> React.string} </li>
    )
    ->React.array
  )
  ->Belt.Option.getWithDefault(React.null)
