module AsyncResult = Relude.AsyncResult;
module Option = Relude.Option;

let useArticles = () => {
  let didCancel = React.useRef(false);
  let (data, setData) = React.useState(() => AsyncResult.init);

  React.useEffect0(() => {
    open Js.Promise;

    if (!React.Ref.current(didCancel)) {
      setData(prev =>
        prev
        |> AsyncResult.getOk
        |> Option.getOrElse(
             Shape.ArticlesApiResponse.{articles: [||], articlesCount: 0},
           )
        |> AsyncResult.reloadingOk
      );
    };

    API.listArticles()
    |> then_(data => {
         if (!React.Ref.current(didCancel)) {
           setData(_prev =>
             switch (data) {
             | Belt.Result.Ok(ok) => ok |> AsyncResult.completeOk
             | Error(error) =>
               AppError.EDecodeParseError(error) |> AsyncResult.completeError
             }
           );
         };
         ignore() |> resolve;
       })
    |> catch(error => {
         if (!React.Ref.current(didCancel)) {
           setData(_prev =>
             AppError.EFetch(error) |> AsyncResult.completeError
           );
         };
         ignore() |> resolve;
       })
    |> ignore;

    Some(() => React.Ref.setCurrent(didCancel, true));
  });

  data;
};

let useTags = () => {
  let didCancel = React.useRef(false);
  let (data, setData) = React.useState(() => AsyncResult.init);

  React.useEffect0(() => {
    open Js.Promise;

    if (!React.Ref.current(didCancel)) {
      setData(prev =>
        prev
        |> AsyncResult.getOk
        |> Option.getOrElse([||])
        |> AsyncResult.reloadingOk
      );
    };

    API.tags()
    |> then_(data => {
         if (!React.Ref.current(didCancel)) {
           setData(_prev =>
             switch (data) {
             | Belt.Result.Ok(ok) => ok |> AsyncResult.completeOk
             | Error(error) =>
               AppError.EDecodeParseError(error) |> AsyncResult.completeError
             }
           );
         };
         ignore() |> resolve;
       })
    |> catch(error => {
         if (!React.Ref.current(didCancel)) {
           setData(_prev =>
             AppError.EFetch(error) |> AsyncResult.completeError
           );
         };
         ignore() |> resolve;
       })
    |> ignore;

    Some(() => React.Ref.setCurrent(didCancel, true));
  });

  data;
};
