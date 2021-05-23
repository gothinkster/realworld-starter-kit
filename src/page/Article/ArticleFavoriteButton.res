@react.component
let make = (~data: AsyncData.t<(bool, int, string)>, ~onClick: Link.onClickAction) =>
  <Link.Button
    className={switch data {
    | Init
    | Loading
    | Reloading((false, _, _))
    | Complete((false, _, _)) => "btn btn-sm btn-outline-primary"
    | Reloading((true, _, _)) | Complete((true, _, _)) => "btn btn-sm btn-primary"
    }}
    style={ReactDOM.Style.make(~marginLeft="5px", ())}
    onClick={switch data {
    | Init | Loading | Reloading((_, _, _)) => Link.customFn(ignore)
    | Complete((_, _, _)) => onClick
    }}>
    <i
      className={AsyncData.isBusy(data) ? "ion-load-a" : "ion-heart"}
      style={ReactDOM.Style.make(~marginRight="5px", ())}
    />
    {switch data {
    | Init | Loading => React.null
    | Reloading((favorited, favoritesCount, _slug))
    | Complete((favorited, favoritesCount, _slug)) => <>
        {(favorited ? "Unfavorite Article " : "Favorite Article ")->React.string}
        <span className="counter"> {`(${favoritesCount->Belt.Int.toString})`->React.string} </span>
      </>
    }}
  </Link.Button>
