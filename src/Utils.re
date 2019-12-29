type cookiePair = (string, option(string));

let cookie: array(cookiePair) =
  Webapi.Dom.document
  |> Webapi.Dom.Document.asHtmlDocument
  |> Relude.Option.getOrThrow
  |> Webapi.Dom.HtmlDocument.cookie
  |> Js.String.split(";")
  |> Relude.Array.flatMap(str => {
       let pair =
         str |> Js.String.split("=") |> Relude.Array.map(Js.String.trim);
       let key = pair |> Relude.Array.at(0);
       let value = pair |> Relude.Array.at(1);

       key
       |> Relude.Option.map(str => [|(str, value)|])
       |> Relude.Option.getOrElse([||]);
     });

let getCookie = (name: string): option(cookiePair) =>
  cookie
  |> Relude.Array.find(pair => {
       let key = fst(pair);
       key == name;
     });
