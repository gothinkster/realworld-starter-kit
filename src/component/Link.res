type location'

type onClickAction =
  | Location(location')
  | CustomFn(unit => unit)

let customFn = fn => CustomFn(fn)
let location = location => Location(location)

external make: string => location' = "%identity"
external toString: location' => string = "%identity"

let home = make("/")
let settings = make("/#/settings")
let register = make("/#/register")
let login = make("/#/login")
let createArticle = make("/#/editor")
let editArticle = (~slug) => make(`/#/editor/${slug}`)
let article = (~slug) => make(`/#/article/${slug}`)
let profile = (~username) => make(`/#/profile/${username}`)
let favorited = (~username) => make(`/#/profile/${username}/favorites`)

let push: location' => unit = location => location->toString->RescriptReactRouter.push

let availableIf: (bool, onClickAction) => onClickAction = (available, target) =>
  available ? target : CustomFn(ignore)

let handleClick = (onClick, event) => {
  switch onClick {
  | Location(location) =>
    if Utils.isMouseRightClick(event) {
      event->ReactEvent.Mouse.preventDefault
      location->toString->RescriptReactRouter.push
    }
  | CustomFn(fn) => fn()
  }
  ignore()
}

@react.component
let make = (~className="", ~style=ReactDOM.Style.make(), ~onClick, ~children) => {
  let href = switch onClick {
  | Location(location) => Some(location->toString)
  | CustomFn(_fn) => None
  }
  <a className ?href style onClick={handleClick(onClick)}> children </a>
}

module Button = {
  @react.component
  let make = (~className="", ~style=ReactDOM.Style.make(), ~onClick, ~disabled=false, ~children) =>
    <button className style onClick={handleClick(onClick)} disabled> children </button>
}
