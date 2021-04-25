type cookiePair = (string, option<string>)

let secondInMs = 1000.
let minuteInMs = 60. *. secondInMs
let hourInMs = 60. *. minuteInMs
let dayInMs = 24. *. hourInMs
let monthInMs = 30. *. dayInMs

let parseCookies: unit => array<cookiePair> = () =>
  Webapi.Dom.document
  |> Webapi.Dom.Document.asHtmlDocument
  |> Relude.Option.getOrThrow
  |> Webapi.Dom.HtmlDocument.cookie
  |> Js.String.split(";")
  |> Relude.Array.flatMap(str => {
    let pair = str |> Js.String.split("=") |> Relude.Array.map(Js.String.trim)
    let key = pair |> Relude.Array.at(0)
    let value = pair |> Relude.Array.at(1)

    key |> Relude.Option.map(str => [(str, value)]) |> Relude.Option.getOrElse([])
  })

let getCookie = (name: string): option<cookiePair> => parseCookies() |> Relude.Array.find(pair => {
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
  let htmlDocument =
    Webapi.Dom.document |> Webapi.Dom.Document.asHtmlDocument |> Relude.Option.getOrThrow

  let cookie = Printf.sprintf(
    "%s=%s;%s%s",
    key,
    value |> Relude.Option.getOrElse(""),
    expires == "" ? "" : Printf.sprintf(" expires=%s;", expires),
    path
    |> Option.flatMap(path => path == "" ? None : Some(path))
    |> Option.map(path => Printf.sprintf(" path=%s;", path))
    |> Option.getOrElse(""),
  )

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

let formatDate: Js.Date.t => string = date =>
  Printf.sprintf(
    "%04.0f/%02.0f/%02.0f",
    date |> Js.Date.getFullYear,
    date |> Js.Date.getMonth,
    date |> Js.Date.getDate,
  )

let debugAsyncResult: AsyncResult.t<'a, 'e> => unit = asyncResult =>
  switch asyncResult {
  | Init => "Init" |> Js.log
  | Loading => "Loading" |> Js.log
  | Reloading(Ok(_)) => "Reloading(Ok())" |> Js.log
  | Reloading(Error(e)) => Js.log2("Reloading(Error(%o)", e)
  | Complete(Ok(_)) => "Complete(Ok())" |> Js.log
  | Complete(Error(e)) => Js.log2("Complete(Error(%o)", e)
  }
