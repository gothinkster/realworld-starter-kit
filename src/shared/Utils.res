type cookiePair = (string, option<string>)

let secondInMs = 1000.
let minuteInMs = 60. *. secondInMs
let hourInMs = 60. *. minuteInMs
let dayInMs = 24. *. hourInMs
let monthInMs = 30. *. dayInMs

let parseCookies: unit => array<cookiePair> = () =>
  Webapi.Dom.document
  ->Webapi.Dom.Document.asHtmlDocument
  ->Belt.Option.getExn
  ->Webapi.Dom.HtmlDocument.cookie
  ->Js.String2.split(";")
  ->Js.Array2.reduce((acc, str) => {
    let pair = str->Js.String2.split("=")->Js.Array2.map(Js.String.trim)
    let key = pair->Belt.Array.getExn(0)
    let value = pair->Belt.Array.get(1)

    acc->Js.Array2.concat([(key, value)])
  }, [])

let getCookie = (name: string): option<cookiePair> =>
  parseCookies()->Js.Array2.find(pair => {
    let key = fst(pair)
    key == name
  })

let setCookieRaw: (
  ~key: string,
  ~value: string=?,
  ~expires: string,
  ~path: string=?,
  unit,
) => unit = (~key, ~value=?, ~expires, ~path=?, ()) => {
  let htmlDocument = Webapi.Dom.document->Webapi.Dom.Document.asHtmlDocument->Belt.Option.getExn

  let value = value->Belt.Option.getWithDefault("")
  let expires = expires !== "" ? `expires=${expires};` : ""
  let path =
    path
    ->Belt.Option.flatMap(path => path == "" ? None : Some(path))
    ->Belt.Option.map(path => ` path=${path};`)
    ->Belt.Option.getWithDefault("")
  let cookie = `${key}=${value};${expires}${path}`

  Webapi.Dom.HtmlDocument.setCookie(htmlDocument, cookie)
}

let setCookie: (string, option<string>) => unit = (key, value) => {
  let expires = Js.Date.make()
  let _ = Js.Date.setTime(expires, Js.Date.getTime(expires) +. monthInMs)

  setCookieRaw(~key, ~value?, ~expires=expires |> Js.Date.toUTCString, ~path="/", ())
}

let deleteCookie: string => unit = key =>
  setCookieRaw(~key, ~expires="Thu, 01 Jan 1970 00:00:01 GMT", ())

let isMouseRightClick = event =>
  !ReactEvent.Mouse.defaultPrevented(event) &&
  ReactEvent.Mouse.button(event) == 0 &&
  !ReactEvent.Mouse.altKey(event) &&
  !ReactEvent.Mouse.ctrlKey(event) &&
  !ReactEvent.Mouse.metaKey(event) &&
  !ReactEvent.Mouse.shiftKey(event)

let formatDate: Js.Date.t => string = date => {
  let yyyy = date->Js.Date.getFullYear->Belt.Int.fromFloat->Belt.Int.toString
  let mm = date->Js.Date.getMonth->Belt.Int.fromFloat->Belt.Int.toString
  let dd = date->Js.Date.getDate->Belt.Int.fromFloat->Belt.Int.toString

  `${yyyy}/${mm}/${dd}`
}

module Json = {
  let decodeArrayString = (json: option<Js.Json.t>): option<array<string>> =>
    json
    ->Belt.Option.flatMap(Js.Json.decodeArray)
    ->Belt.Option.map(xs => xs->Belt.Array.keepMap(Js.Json.decodeString))
}
