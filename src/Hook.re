open Js.Promise;

module AsyncResult = Relude.AsyncResult;
module AsyncData = Relude.AsyncData;
module Option = Relude.Option;

let guardByDidCancel: (React.Ref.t(bool), unit => unit) => unit =
  (didCancel, cb) => !React.Ref.current(didCancel) ? cb() : ();

let useArticles: unit => AsyncResult.t(Shape.Articles.t, Error.t) =
  () => {
    let didCancel = React.useRef(false);
    let (data, setData) = React.useState(() => AsyncResult.init);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() => {
      guard(() =>
        setData(prev =>
          prev
          |> AsyncResult.getOk
          |> Option.getOrElse(Shape.Articles.empty)
          |> AsyncResult.reloadingOk
        )
      );

      API.listArticles()
      |> then_(data => {
           guard(() =>
             setData(_prev =>
               switch (data) {
               | Belt.Result.Ok(ok) => AsyncResult.completeOk(ok)
               | Error(error) =>
                 AsyncResult.completeError(Error.EDecodeParseError(error))
               }
             )
           )
           |> resolve
         })
      |> catch(error => {
           guard(() =>
             setData(_prev => AsyncResult.completeError(Error.EFetch(error)))
           )
           |> resolve
         })
      |> ignore;

      Some(() => React.Ref.setCurrent(didCancel, true));
    });

    data;
  };

let useTags: unit => AsyncResult.t(Shape.Tags.t, Error.t) =
  () => {
    let didCancel = React.useRef(false);
    let (data, setData) = React.useState(() => AsyncResult.init);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() => {
      guard(() =>
        setData(prev =>
          prev
          |> AsyncResult.getOk
          |> Option.getOrElse([||])
          |> AsyncResult.reloadingOk
        )
      );

      API.tags()
      |> then_(data => {
           guard(() =>
             setData(_prev =>
               switch (data) {
               | Belt.Result.Ok(ok) => ok |> AsyncResult.completeOk
               | Error(error) =>
                 Error.EDecodeParseError(error) |> AsyncResult.completeError
               }
             )
           )
           |> resolve
         })
      |> catch(error => {
           guard(() =>
             setData(_prev =>
               Error.EFetch(error) |> AsyncResult.completeError
             )
           )
           |> resolve
         })
      |> ignore;

      Some(() => React.Ref.setCurrent(didCancel, true));
    });

    data;
  };

let useCurrentUser: unit => AsyncData.t(option(Shape.User.t)) =
  () => {
    let didCancel = React.useRef(false);
    let (data, setData) = React.useState(() => AsyncData.init);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() => {
      guard(() => setData(prev => prev |> AsyncData.toBusy));

      API.currentUser()
      |> then_(data => {
           guard(() =>
             setData(_prev =>
               switch (data) {
               | Belt.Result.Ok(data') => Some(data') |> AsyncData.complete
               | Error(_error) => None |> AsyncData.complete
               }
             )
           )
           |> resolve
         })
      |> catch(_error => {
           guard(() => setData(_prev => None |> AsyncData.complete)) |> resolve
         })
      |> ignore;

      Some(() => React.Ref.setCurrent(didCancel, true));
    });

    data;
  };
