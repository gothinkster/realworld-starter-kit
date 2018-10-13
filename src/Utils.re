let strEl = ReasonReact.string;

let arrayEl = ReasonReact.array;

let nullEl = ReasonReact.null;

[@bs.val] external requireCSS: string => unit = "require";

[@bs.val] external requireAssetURI: string => string = "require";

let id = a => a;

let getSomeErrors = (results, fields) => {
  let validation =
    fields
    ->Belt.List.mapU((. field) =>
        switch (field |> results) {
        | Some(Formality.Invalid(message)) => [message]
        | Some(Valid)
        | None => []
        }
      )
    ->Belt.List.flatten;
  switch (validation) {
  | [] => None
  | data => Some(data)
  };
};

let getFirstError =
    (field: 'a, prefix: string, errors: option(array(string)))
    : option(('a, string)) =>
  errors->(
            Belt.Option.mapU((. errors) =>
              (
                field,
                errors
                ->(Belt.Array.get(0))
                ->(Belt.Option.getWithDefault("is unknown error"))
                |> (++)(prefix ++ " "),
              )
            )
          );

let setCookie = (key, value) =>
  (Webapi.Dom.document |> Webapi.Dom.Document.asHtmlDocument)
  ->(
      Belt.Option.mapU((. htmlDocument) =>
        htmlDocument
        |> Webapi.Dom.HtmlDocument.cookie
        |> (++)(key ++ "=" ++ value ++ ";")
        |> Webapi.Dom.HtmlDocument.setCookie(htmlDocument)
      )
    )
  |> ignore;

let getCookie = target =>
  (Webapi.Dom.document |> Webapi.Dom.Document.asHtmlDocument)
  ->(
      Belt.Option.flatMapU((. htmlDocument) =>
        (
          htmlDocument
          |> Webapi.Dom.HtmlDocument.cookie
          |> Js.String.split(";")
          |> Js.Array.map(cookieStr =>
               switch (cookieStr |> Js.String.split("=")) {
               | [|name, value|] => (
                   name |> Js.String.trim,
                   value |> Js.String.trim,
                 )
               | [||]
               | _ => ("", "")
               }
             )
          |> Js.Array.find(((name, _value)) => target === name)
        )
        ->(
            Belt.Option.flatMapU((. (_name, value)) =>
              value === "" ? None : Some(value)
            )
          )
      )
    );
