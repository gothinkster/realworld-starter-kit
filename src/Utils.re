let strEl = ReasonReact.stringToElement;

let arrayEl = ReasonReact.arrayToElement;

let nullEl = ReasonReact.nullElement;

[@bs.val] external requireCSS : string => unit = "require";

[@bs.val] external requireAssetURI : string => string = "require";

let id = a => a;

let getSomeErrors = (results, fields) => {
  let validation =
    fields
    |. Belt.List.mapU((. field) =>
         switch (field |> results) {
         | Some(Formality.Invalid(message)) => [message]
         | Some(Valid)
         | None => []
         }
       )
    |. Belt.List.flatten;
  switch (validation) {
  | [] => None
  | data => Some(data)
  };
};
