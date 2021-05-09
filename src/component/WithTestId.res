// source code from https://github.com/reasonml/reason-react/issues/230#issuecomment-562446425
@react.component
let make = (~id: string, ~children) => React.cloneElement(children, {"data-testid": id})
