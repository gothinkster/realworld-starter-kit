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
