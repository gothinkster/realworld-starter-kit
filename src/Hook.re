open Js.Promise;

module AsyncResult = Relude.AsyncResult;
module AsyncData = Relude.AsyncData;
module Option = Relude.Option;

let guardByDidCancel: (React.Ref.t(bool), unit => unit) => unit =
  (didCancel, cb) => !React.Ref.current(didCancel) ? cb() : ();

let useArticles:
  (~feedType: Shape.FeedType.t) =>
  (
    AsyncResult.t(Shape.Articles.t, Error.t),
    (
      AsyncResult.t(Shape.Articles.t, Error.t) =>
      AsyncResult.t(Shape.Articles.t, Error.t)
    ) =>
    unit,
  ) =
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

    (data, setData);
  };

let useArticlesFromProfile:
  (~viewMode: Shape.Profile.viewMode) =>
  AsyncResult.t(Shape.Articles.t, Error.t) =
  (~viewMode) => {
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
          switch (viewMode) {
          | Author(author, limit, offset) =>
            API.listArticles(~author, ~limit, ~offset, ())
          | Favorited(favorited, limit, offset) =>
            API.listArticles(~favorited, ~limit, ~offset, ())
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
      (viewMode, setData),
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

        API.article(~action=Fetch(slug), ())
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
  (~slug: string) =>
  (
    AsyncResult.t(array(Shape.Comment.t), Error.t),
    Belt.Set.Int.t,
    (~slug: string, ~id: int) => unit,
  ) =
  (~slug) => {
    let didCancel = React.useRef(false);
    let (data, setData) = React.useState(() => AsyncResult.init);
    let (busy, setBusy) = React.useState(() => Belt.Set.Int.empty);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() =>
      Some(() => React.Ref.setCurrent(didCancel, true))
    );

    React.useEffect2(
      () => {
        guard(() => setData(prev => prev |> AsyncResult.toBusy));
        guard(() => setBusy(_prev => Belt.Set.Int.empty));

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

    let deleteComment = (~slug, ~id) => {
      setBusy(prev => prev |> Belt.Set.Int.add(_, id));

      API.deleteComment(~slug, ~id, ())
      |> Js.Promise.then_(resp => {
           setBusy(prev => prev |> Belt.Set.Int.remove(_, id));

           switch (resp) {
           | Belt.Result.Ok((_slug, id)) =>
             setData(prev =>
               prev
               |> AsyncResult.map(comments =>
                    Belt.Array.keep(comments, (comment: Shape.Comment.t) =>
                      comment.id != id
                    )
                  )
             )
           | Error(_error) => ignore()
           };

           ignore() |> resolve;
         })
      |> ignore;
    };

    (data, busy, deleteComment);
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
      switch (state) {
      | Init =>
        article
        |> AsyncResult.getOk
        |> Option.map((ok: Shape.Article.t) =>
             AsyncData.complete((ok.author.username, ok.author.following))
           )
        |> Option.getOrElse(AsyncData.complete(("", false)))
      | Loading as orig
      | Reloading(_) as orig
      | Complete(_) as orig => orig
      };

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

      guard(() => setState(_prev => follow |> AsyncData.toBusy));

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
      switch (state) {
      | Init =>
        article
        |> AsyncResult.getOk
        |> Option.map((ok: Shape.Article.t) =>
             AsyncData.complete((ok.favorited, ok.favoritesCount, ok.slug))
           )
        |> Option.getOrElse(AsyncData.complete((false, 0, "")))
      | Loading as orig
      | Reloading(_) as orig
      | Complete(_) as orig => orig
      };

    let sendRequest = () => {
      let (favorited, _favoritesCount, slug) =
        favorite |> AsyncData.getValue |> Option.getOrElse((false, 0, ""));

      let action = favorited ? API.Unfavorite(slug) : API.Favorite(slug);

      guard(() => setState(_prev => favorite |> AsyncData.toBusy));

      API.favoriteArticle(~action, ())
      |> then_(data => {
           guard(() =>
             setState(_prev => {
               switch (data) {
               | Belt.Result.Ok((ok: Shape.Article.t)) =>
                 AsyncData.complete((
                   ok.favorited,
                   ok.favoritesCount,
                   ok.slug,
                 ))
               | Error(_error) => AsyncData.complete((false, 0, ""))
               }
             })
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

let useDeleteArticle:
  (
    ~article: AsyncResult.t(Shape.Article.t, Error.t),
    ~user: option(Shape.User.t)
  ) =>
  (bool, Link.onClickAction) =
  (~article, ~user) => {
    let didCancel = React.useRef(false);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() =>
      Some(() => React.Ref.setCurrent(didCancel, true))
    );

    let (state, setState) = React.useState(() => false);

    let sendRequest = () => {
      let slug =
        article
        |> AsyncResult.getOk
        |> Option.map((ok: Shape.Article.t) => ok.slug)
        |> Option.getOrElse("");

      guard(() => setState(_prev => true));

      API.article(~action=Delete(slug), ())
      |> then_(_data => {
           guard(() => setState(_prev => false));
           Link.push(Link.home);
           ignore() |> resolve;
         })
      |> catch(_error => {guard(() => setState(_prev => false)) |> resolve})
      |> ignore;
    };

    let onClick =
      switch (user, state) {
      | (Some(_user), false) =>
        Link.CustomFn(
          () =>
            if (Webapi.Dom.Window.confirm(
                  "Are you sure you want to delete this article?",
                  Webapi.Dom.window,
                )) {
              sendRequest();
            } else {
              ignore();
            },
        )
      | (Some(_), true)
      | (None, true | false) => Link.CustomFn(ignore)
      };

    (state, onClick);
  };

let useToggleFavorite:
  (
    ~setArticles: (
                    AsyncResult.t(Shape.Articles.t, Error.t) =>
                    AsyncResult.t(Shape.Articles.t, Error.t)
                  ) =>
                  unit,
    ~user: option(Shape.User.t)
  ) =>
  (Belt.Set.String.t, (~action: API.favoriteAction) => unit) =
  (~setArticles, ~user) => {
    let didCancel = React.useRef(false);
    let guard = guardByDidCancel(didCancel);

    React.useEffect0(() =>
      Some(() => React.Ref.setCurrent(didCancel, true))
    );

    let (busy, setBusy) = React.useState(() => Belt.Set.String.empty);

    let sendRequest = (~action) => {
      let slug =
        switch (action) {
        | API.Favorite(slug)
        | Unfavorite(slug) => slug
        };

      guard(() => setBusy(prev => prev |> Belt.Set.String.add(_, slug)));

      API.favoriteArticle(~action, ())
      |> Js.Promise.then_(data => {
           guard(() => {
             setBusy(prev => prev |> Belt.Set.String.remove(_, slug));

             switch (data) {
             | Ok(_) =>
               setArticles(prev =>
                 prev
                 |> AsyncResult.map((articles: Shape.Articles.t) =>
                      {
                        ...articles,
                        articles:
                          articles.articles
                          |> Relude.Array.map((article: Shape.Article.t) =>
                               if (article.slug == slug) {
                                 {
                                   ...article,
                                   favorited:
                                     switch (action) {
                                     | Favorite(_) => true
                                     | Unfavorite(_) => false
                                     },
                                   favoritesCount:
                                     switch (action) {
                                     | Favorite(_) =>
                                       article.favoritesCount + 1
                                     | Unfavorite(_) =>
                                       article.favoritesCount - 1
                                     },
                                 };
                               } else {
                                 article;
                               }
                             ),
                      }
                    )
               )
             | Error(_error) => ignore()
             };
           });

           ignore() |> resolve;
         })
      |> Js.Promise.catch(_error => {
           guard(() =>
             setBusy(prev => prev |> Belt.Set.String.remove(_, slug))
           );
           ignore() |> resolve;
         })
      |> ignore;
    };

    let onToggle = (~action) =>
      switch (user) {
      | Some(_) => sendRequest(~action)
      | None => Link.push(Link.register)
      };

    (busy, onToggle);
  };
