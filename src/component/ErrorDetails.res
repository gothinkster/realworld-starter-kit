open Relude.Globals

@react.component
let make = (~label: string, ~error: option<array<string>>) =>
  error
  |> Option.map(message =>
    message
    |> Array.map(message =>
      <li key=message> {Printf.sprintf("%s %s", label, message) |> React.string} </li>
    )
    |> React.array
  )
  |> Option.getOrElse(React.null)
