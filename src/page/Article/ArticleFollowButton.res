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
