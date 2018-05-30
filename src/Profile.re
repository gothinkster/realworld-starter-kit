open Utils;

type state = {
  followAction: Types.remoteAction,
  profile: Types.remoteProfile,
  articles: Types.remoteArticles,
  articlesCount: float,
  currentPage: int,
  togglingFavorites: Belt.Map.String.t(Types.remoteAction),
};

type retainedProps = {author: Types.articleByAuthor};

type action =
  | ToggleFavorite(string, Types.remoteAction)
  | UpdateFollowAction(Types.remoteAction)
  | UpdateProfile(Types.remoteProfile)
  | UpdateArticle(string, Types.article)
  | UpdateArticles((Types.remoteArticles, float, int));

let pageNum = 10.;

let getAuthorParam =
  fun
  | Types.Author(v) => (Some(v), None)
  | Favorited(v) => (None, Some(v));

let loadArticles =
    (~author, ~favorited, ~page=1, _payload, {ReasonReact.send}) => {
  open Js.Promise;
  let limit = pageNum |> int_of_float;
  let offset = (float_of_int(page) -. 1.) *. pageNum |> int_of_float;
  send(UpdateArticles((RemoteData.Loading, 0., page)));
  API.listArticles(~author?, ~favorited?, ~offset, ~limit, ())
  |> then_(result => {
       switch (result) {
       | Belt.Result.Ok(json) =>
         let articles =
           json
           |> Json.Decode.(field("articles", array(Decoder.article)))
           |> Belt.List.fromArray;
         let articlesCount =
           json |> Json.Decode.(field("articlesCount", Json.Decode.float));
         send(
           UpdateArticles((
             RemoteData.Success(articles),
             articlesCount,
             page,
           )),
         );
       | Error(_) =>
         send(
           UpdateArticles((
             RemoteData.Failure("failed to fetch list of articles by author"),
             0.,
             page,
           )),
         )
       };
       ignore() |> resolve;
     })
  |> catch(_error =>
       send(
         UpdateArticles((
           RemoteData.Failure("failed to fetch list of articles by author"),
           0.,
           page,
         )),
       )
       |> resolve
     )
  |> ignore;
};

let loadProfile =
    (payload: Types.articleByAuthor, {ReasonReact.send, handle}) => {
  open Js.Promise;
  {
    let author =
      switch (payload) {
      | Author(v) => v
      | Favorited(v) => v
      };
    send(UpdateProfile(RemoteData.Loading));
    API.profiles(~author)
    |> then_(result => {
         switch (result) {
         | Belt.Result.Ok(json) =>
           let profile =
             json |> Json.Decode.(field("profile", Decoder.profile));
           send(UpdateProfile(RemoteData.Success(profile)));
         | Error(_) =>
           send(
             UpdateProfile(RemoteData.Failure("failed to fetch profile")),
           )
         };
         ignore() |> resolve;
       })
    |> catch(_error =>
         send(UpdateProfile(RemoteData.Failure("failed to fetch profile")))
         |> resolve
       )
    |> ignore;
  };
  let (author, favorited) = getAuthorParam(payload);
  handle(loadArticles(~author, ~favorited), ());
};

let changeCurrentPage = (~payload, page, {ReasonReact.handle}) => {
  let (author, favorited) = getAuthorParam(payload);
  handle(loadArticles(~page, ~author, ~favorited), ());
};

let followAuthorOrRedirectToSetting =
    (
      ~profile: Types.remoteProfile,
      ~user: Types.remoteUser,
      _event,
      {ReasonReact.send},
    ) =>
  switch (user) {
  | RemoteData.NotAsked
  | Loading
  | Failure(_) => ReasonReact.Router.push("/#/login")
  | Success(userVal) =>
    switch (profile) {
    | Success(profileVal) when userVal.username === profileVal.username =>
      ReasonReact.Router.push("/#/settings")
    | Success(profileVal) =>
      let {Types.following, username} = profileVal;
      send(UpdateFollowAction(RemoteData.Loading));
      Js.Promise.(
        (following ? API.unfollowUser(username) : API.followUser(username))
        |> then_(_result => {
             send(
               UpdateProfile(
                 RemoteData.Success({...profileVal, following: ! following}),
               ),
             );
             send(UpdateFollowAction(RemoteData.NotAsked));
             ignore() |> resolve;
           })
        |> catch(_error => {
             send(UpdateFollowAction(RemoteData.NotAsked));
             ignore() |> resolve;
           })
        |> ignore
      );
    | NotAsked
    | Loading
    | Failure(_) => ignore()
    }
  };

let favoriteArticle = (~user, (slug, favorited), {ReasonReact.send}) =>
  Js.Promise.(
    switch (user) {
    | RemoteData.NotAsked
    | Loading
    | Failure(_) => ReasonReact.Router.push("/#/login")
    | Success(_) =>
      send(ToggleFavorite(slug, RemoteData.Loading));
      (favorited ? API.favoriteArticle(slug) : API.unfavoriteArticle(slug))
      |> then_(result => {
           switch (result) {
           | Belt.Result.Ok(json) =>
             let article =
               json |> Json.Decode.field("article", Decoder.article);
             send(UpdateArticle(slug, article));
           | Error(error) =>
             Js.log2("failed to toggle favorite article", error)
           };
           send(ToggleFavorite(slug, RemoteData.NotAsked));
           ignore() |> resolve;
         })
      |> catch(error => {
           Js.log2("failed to toggle favorite article: ", error);
           send(ToggleFavorite(slug, RemoteData.NotAsked));
           ignore() |> resolve;
         })
      |> ignore;
    }
  );

let component = ReasonReact.reducerComponentWithRetainedProps("Profile");

let make =
    (~user: Types.remoteUser, ~author: Types.articleByAuthor, _children) => {
  ...component,
  initialState: () => {
    followAction: RemoteData.NotAsked,
    profile: RemoteData.NotAsked,
    articles: RemoteData.NotAsked,
    articlesCount: 0.,
    currentPage: 1,
    togglingFavorites: Belt.Map.String.empty,
  },
  retainedProps: {
    author: author,
  },
  reducer: (action, state) =>
    switch (action) {
    | ToggleFavorite(slug, value) =>
      let togglingFavorites =
        state.togglingFavorites
        |. Belt.Map.String.update(slug, _previous => Some(value));
      ReasonReact.Update({...state, togglingFavorites});
    | UpdateFollowAction(followAction) =>
      ReasonReact.Update({...state, followAction})
    | UpdateProfile(profile) => ReasonReact.Update({...state, profile})
    | UpdateArticle(slug, article) =>
      let articles =
        state.articles
        |> RemoteData.map(articles =>
             articles
             |. Belt.List.map((x: Types.article) =>
                  x.slug === slug ? article : x
                )
           );
      ReasonReact.Update({...state, articles});
    | UpdateArticles((articles, articlesCount, currentPage)) =>
      ReasonReact.Update({...state, articles, articlesCount, currentPage})
    },
  didMount: ({handle}) => handle(loadProfile, author),
  didUpdate: ({oldSelf, newSelf}) =>
    if (oldSelf.retainedProps.author !== newSelf.retainedProps.author) {
      newSelf.handle(loadProfile, newSelf.retainedProps.author);
    },
  render: ({state, handle}) => {
    let {
      followAction,
      currentPage,
      articles,
      articlesCount,
      profile,
      togglingFavorites,
    } = state;
    let authorVal =
      switch (author) {
      | Author(v) => v
      | Favorited(v) => v
      };
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src=(
                  switch (profile) {
                  | NotAsked
                  | Loading
                  | Failure(_) => "//placehold.it/100x100"
                  | Success({image}) => image
                  }
                )
                className="user-img"
              />
              <h4>
                (
                  switch (profile) {
                  | NotAsked
                  | Loading
                  | Failure(_) => nullEl
                  | Success({username}) => username |> strEl
                  }
                )
              </h4>
              <p>
                (
                  switch (profile) {
                  | NotAsked
                  | Loading
                  | Failure(_) => nullEl
                  | Success({bio}) =>
                    switch (bio) {
                    | Some(v) => v |> strEl
                    | None => nullEl
                    }
                  }
                )
              </p>
              <button
                className="btn btn-sm btn-outline-secondary action-btn"
                onClick=(
                  handle(followAuthorOrRedirectToSetting(~user, ~profile))
                )
                disabled=(
                  switch (followAction) {
                  | NotAsked
                  | Success(_)
                  | Failure(_) => false
                  | Loading => true
                  }
                )>
                (
                  switch (profile, user) {
                  | (Success(profileVal), Success(userVal))
                      when userVal.username === profileVal.username =>
                    <i className="ion-gear-a" />
                  | (
                      NotAsked | Loading | Success(_) | Failure(_),
                      NotAsked | Loading | Success(_) | Failure(_),
                    ) =>
                    <i className="ion-plus-round" />
                  }
                )
                (
                  switch (profile, user) {
                  | (Success(profileVal), Success(userVal))
                      when userVal.username === profileVal.username =>
                    " Edit Profile Settings" |> strEl
                  | (
                      Success({following, username}),
                      NotAsked | Loading | Success(_) | Failure(_),
                    ) =>
                    (following ? " Unfollow " : " Follow ")
                    ++ username
                    |> strEl
                  | (
                      NotAsked | Loading,
                      NotAsked | Loading | Success(_) | Failure(_),
                    ) =>
                    " ... " |> strEl
                  | (Failure(_), NotAsked | Loading | Success(_) | Failure(_)) => nullEl
                  }
                )
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a
                    className=(
                      "nav-link"
                      ++ (
                        switch (author) {
                        | Author(_) => " active"
                        | Favorited(_) => ""
                        }
                      )
                    )
                    href=("/#/profile/" ++ authorVal)>
                    ("My Articles" |> strEl)
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className=(
                      "nav-link"
                      ++ (
                        switch (author) {
                        | Author(_) => ""
                        | Favorited(_) => " active"
                        }
                      )
                    )
                    href=("/#/profile/" ++ authorVal ++ "/favorites")>
                    ("Favorited Articles" |> strEl)
                  </a>
                </li>
              </ul>
            </div>
            (
              switch (articles) {
              | NotAsked =>
                <div className="article-preview">
                  ("Initializing..." |> strEl)
                </div>
              | Loading =>
                <div className="article-preview">
                  ("Loading..." |> strEl)
                </div>
              | Failure(error) =>
                <div className="article-preview">
                  ("ERROR: " ++ error |> strEl)
                </div>
              | Success(data) =>
                data
                |. Belt.List.mapU((. value: Types.article) =>
                     <ArticleItem
                       key=value.slug
                       value
                       onFavoriteClick=(handle(favoriteArticle(~user)))
                       favoriteDisabled=(
                         togglingFavorites
                         |.
                         Belt.Map.String.getWithDefault(
                           value.slug,
                           RemoteData.NotAsked,
                         ) === RemoteData.Loading
                       )
                     />
                   )
                |> Belt.List.toArray
                |> arrayEl
              }
            )
            (
              switch (articles) {
              | NotAsked
              | Loading
              | Failure(_) => nullEl
              | Success(_) =>
                <Pagination
                  totalCount=articlesCount
                  perPage=pageNum
                  onPageClick=(handle(changeCurrentPage(~payload=author)))
                  currentPage
                />
              }
            )
          </div>
        </div>
      </div>
    </div>;
  },
};
