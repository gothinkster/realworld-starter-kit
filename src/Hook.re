module AsyncResult = Relude.AsyncResult;
module AsyncData = Relude.AsyncData;
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

let useCurrentUser = () => {
  let didCancel = React.useRef(false);
  let (data, setData) = React.useState(() => AsyncData.init);

  React.useEffect0(() => {
    open Js.Promise;

    if (!React.Ref.current(didCancel)) {
      setData(prev => prev |> AsyncData.toBusy);
    };

    API.currentUser()
    |> then_(data => {
         if (!React.Ref.current(didCancel)) {
           setData(_prev =>
             switch (data) {
             | Belt.Result.Ok(data') => Some(data') |> AsyncData.complete
             | Error(_error) => None |> AsyncData.complete
             }
           );
         };
         ignore() |> resolve;
       })
    |> catch(_error => {
         if (!React.Ref.current(didCancel)) {
           setData(_prev => None |> AsyncData.complete);
         };
         ignore() |> resolve;
       })
    |> ignore;

    Some(() => React.Ref.setCurrent(didCancel, true));
  });

  data;
};
