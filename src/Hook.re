open Js.Promise;

module AsyncResult = Relude.AsyncResult;
module AsyncData = Relude.AsyncData;
module Option = Relude.Option;

let guardByDidCancel: (React.Ref.t(bool), unit => unit) => unit =
  (didCancel, cb) => !React.Ref.current(didCancel) ? cb() : ();

let useArticles:
  (~feedType: Shape.FeedType.t) => AsyncResult.t(Shape.Articles.t, Error.t) =
  (~feedType) => {
    let didCancel = React.useRef(false);
    let (data, setData) = React.useState(() => AsyncResult.init);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() =>
      Some(() => React.Ref.setCurrent(didCancel, true))
    );

    React.useEffect2(
      () => {
        guard(() => setData(prev => prev |> AsyncResult.toBusy));

        (
          switch (feedType) {
          | Tag(tag, limit, offset) =>
            API.listArticles(~limit, ~offset, ~tag=?Some(tag), ())
          | Global(limit, offset) => API.listArticles(~limit, ~offset, ())
          | Personal(limit, offset) => API.feedArticles(~limit, ~offset, ())
          }
        )
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
               setData(_prev =>
                 AsyncResult.completeError(Error.EFetch(error))
               )
             )
             |> resolve
           })
        |> ignore;

        None;
      },
      (feedType, setData),
    );

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

let useArticle: (~slug: string) => AsyncResult.t(Shape.Article.t, Error.t) =
  (~slug) => {
    let didCancel = React.useRef(false);
    let (data, setData) = React.useState(() => AsyncResult.init);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() =>
      Some(() => React.Ref.setCurrent(didCancel, true))
    );

    React.useEffect2(
      () => {
        guard(() => setData(prev => prev |> AsyncResult.toBusy));

        API.getArticle(~slug, ())
        |> then_(data => {
             guard(() =>
               setData(_prev =>
                 switch (data) {
                 | Belt.Result.Ok(ok) => AsyncResult.completeOk(ok)
                 | Error(error) => error |> AsyncResult.completeError
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

        None;
      },
      (slug, setData),
    );

    data;
  };

let useComments:
  (~slug: string) => AsyncResult.t(array(Shape.Comment.t), Error.t) =
  (~slug) => {
    let didCancel = React.useRef(false);
    let (data, setData) = React.useState(() => AsyncResult.init);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() =>
      Some(() => React.Ref.setCurrent(didCancel, true))
    );

    React.useEffect2(
      () => {
        guard(() => setData(prev => prev |> AsyncResult.toBusy));

        API.getComments(~slug, ())
        |> then_(data => {
             guard(() =>
               setData(_prev =>
                 switch (data) {
                 | Belt.Result.Ok(ok) => AsyncResult.completeOk(ok)
                 | Error(error) => error |> AsyncResult.completeError
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

        None;
      },
      (slug, setData),
    );

    data;
  };

let useFollow:
  (
    ~article: AsyncResult.t(Shape.Article.t, Error.t),
    ~user: option(Shape.User.t)
  ) =>
  (AsyncData.t((string, bool)), Link.onClickAction) =
  (~article, ~user) => {
    let didCancel = React.useRef(false);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() =>
      Some(() => React.Ref.setCurrent(didCancel, true))
    );

    let (state, setState) = React.useState(() => AsyncData.init);
    let follow =
      AsyncData.alt(
        state,
        article
        |> AsyncResult.getOk
        |> Option.map((ok: Shape.Article.t) =>
             AsyncData.complete((ok.author.username, ok.author.following))
           )
        |> Option.getOrElse(AsyncData.complete(("", false))),
      );

    let sendRequest = () => {
      let username =
        follow
        |> AsyncData.getValue
        |> Option.map(((username, _following)) => username)
        |> Option.getOrElse("");
      let action =
        follow
        |> AsyncData.getValue
        |> Option.flatMap(((_username, following)) =>
             following ? Some(API.Unfollow(username)) : None
           )
        |> Option.getOrElse(API.Follow(username));

      guard(() => setState(prev => prev |> AsyncData.toBusy));

      API.followUser(~action, ())
      |> then_(data => {
           guard(() =>
             setState(_prev =>
               switch (data) {
               | Belt.Result.Ok((ok: Shape.Author.t)) =>
                 AsyncData.complete((ok.username, ok.following))
               | Error(_error) => AsyncData.complete(("", false))
               }
             )
           )
           |> resolve
         })
      |> catch(_error => {
           guard(() => setState(_prev => AsyncData.complete(("", false))))
           |> resolve
         })
      |> ignore;
    };

    let onClick =
      switch (user) {
      | Some(_user) => Link.CustomFn(() => sendRequest())
      | None => Location(Link.register)
      };

    (follow, onClick);
  };

let useFavorite:
  (
    ~article: AsyncResult.t(Shape.Article.t, Error.t),
    ~user: option(Shape.User.t)
  ) =>
  (AsyncData.t((bool, int, string)), Link.onClickAction) =
  (~article, ~user) => {
    let didCancel = React.useRef(false);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() =>
      Some(() => React.Ref.setCurrent(didCancel, true))
    );

    let (state, setState) = React.useState(() => AsyncData.init);
    let favorite =
      AsyncData.alt(
        state,
        article
        |> AsyncResult.getOk
        |> Option.map((ok: Shape.Article.t) =>
             AsyncData.complete((ok.favorited, ok.favoritesCount, ok.slug))
           )
        |> Option.getOrElse(AsyncData.complete((false, 0, ""))),
      );

    let sendRequest = () => {
      let (favorited, _favoritesCount, slug) =
        favorite |> AsyncData.getValue |> Option.getOrElse((false, 0, ""));

      let action = favorited ? API.Unfavorite(slug) : API.Favorite(slug);

      guard(() => setState(prev => prev |> AsyncData.toBusy));

      API.favoriteArticle(~action, ())
      |> then_(data => {
           guard(() =>
             setState(_prev =>
               switch (data) {
               | Belt.Result.Ok((ok: Shape.Article.t)) =>
                 AsyncData.complete((
                   ok.favorited,
                   ok.favoritesCount,
                   ok.slug,
                 ))
               | Error(_error) => AsyncData.complete((false, 0, ""))
               }
             )
           )
           |> resolve
         })
      |> catch(_error => {
           guard(() => setState(_prev => AsyncData.complete((false, 0, ""))))
           |> resolve
         })
      |> ignore;
    };

    let onClick =
      switch (user) {
      | Some(_user) => Link.CustomFn(() => sendRequest())
      | None => Location(Link.register)
      };

    (favorite, onClick);
  };
