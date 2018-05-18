open Utils;

type feed =
  | Tag(string)
  | Global
  | Your;

type action =
  | ToggleFavorite(string, Types.remoteAction)
  | ChangeFeed(feed, int)
  | UpdateTags(Types.remoteTags)
  | UpdateArticle(string, Types.article)
  | UpdateArticles((Types.remoteArticles, float, int));

type state = {
  articles: Types.remoteArticles,
  tags: Types.remoteTags,
  articlesCount: float,
  currentPage: int,
  feed,
  togglingFavorites: Belt.Map.String.t(Types.remoteAction),
};

let pageNum = 10.;

let loadTags = (_payload, {ReasonReact.send, state}) => {
  open Js.Promise;
  switch (state.tags) {
  | NotAsked =>
    send(UpdateTags(RemoteData.Loading));
    API.tags()
    |> then_(result => {
         switch (result) {
         | Js.Result.Ok(json) =>
           let tags =
             json
             |> Json.Decode.(field("tags", array(string)))
             |> Belt.List.fromArray;
           send(UpdateTags(RemoteData.Success(tags)));
         | Error(_) =>
           send(
             UpdateTags(RemoteData.Failure("failed to fetch list of tags")),
           )
         };
         ignore() |> resolve;
       })
    |> catch(_error =>
         send(
           UpdateTags(RemoteData.Failure("failed to fetch list of tags")),
         )
         |> resolve
       )
    |> ignore;
  | Loading
  | Success(_)
  | Failure(_) => ignore()
  };
  ignore();
};

let loadYourFeed = (~page=1, _payload, {ReasonReact.send, handle}) => {
  open Js.Promise;
  let limit = pageNum |> int_of_float;
  let offset = (float_of_int(page) -. 1.) *. pageNum |> int_of_float;
  send(UpdateArticles((RemoteData.Loading, 0., page)));
  API.listArticlesFeed(~offset, ~limit, ())
  |> then_(result => {
       switch (result) {
       | Js.Result.Ok(json) =>
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
             RemoteData.Failure("failed to fetch list of articles"),
             0.,
             1,
           )),
         )
       };
       ignore() |> resolve;
     })
  |> catch(_error =>
       send(
         UpdateArticles((
           RemoteData.Failure("failed to fetch list of articles"),
           0.,
           1,
         )),
       )
       |> resolve
     )
  |> ignore;
  handle(loadTags, ());
};

let loadGlobalFeed = (~tag=?, ~page=1, _payload, {ReasonReact.send, handle}) => {
  open Js.Promise;
  let limit = pageNum |> int_of_float;
  let offset = (float_of_int(page) -. 1.) *. pageNum |> int_of_float;
  send(UpdateArticles((RemoteData.Loading, 0., page)));
  API.listArticles(~tag?, ~offset, ~limit, ())
  |> then_(result => {
       switch (result) {
       | Js.Result.Ok(json) =>
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
             RemoteData.Failure("failed to fetch list of articles"),
             0.,
             1,
           )),
         )
       };
       ignore() |> resolve;
     })
  |> catch(_error =>
       send(
         UpdateArticles((
           RemoteData.Failure("failed to fetch list of articles"),
           0.,
           1,
         )),
       )
       |> resolve
     )
  |> ignore;
  handle(loadTags, ());
};

let onYourFeedClick = (~feed, event, {ReasonReact.send}) => {
  event |> ReactEventRe.Mouse.preventDefault;
  switch (feed) {
  | Your => ignore()
  | Tag(_)
  | Global => send(ChangeFeed(Your, 1))
  };
};

let onGlobalFeedClick = (~feed, event, {ReasonReact.send}) => {
  event |> ReactEventRe.Mouse.preventDefault;
  switch (feed) {
  | Global => ignore()
  | Tag(_)
  | Your => send(ChangeFeed(Global, 1))
  };
};

let initialData = (~user, _payload, {ReasonReact.state, send}) => {
  let {articles} = state;
  switch (articles, user) {
  | (NotAsked, RemoteData.Success(_)) => send(ChangeFeed(Your, 1))
  | (NotAsked, Failure(_)) => send(ChangeFeed(Global, 1))
  | (NotAsked, NotAsked | Loading)
  | (
      Loading | Success(_) | Failure(_),
      NotAsked | Loading | Success(_) | Failure(_),
    ) =>
    ignore()
  };
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
           | Js.Result.Ok(json) =>
             let article =
               json |> Json.Decode.field("article", Decoder.article);
             send(UpdateArticle(slug, article));
           | Error(error) =>
             Js.log2("failed to toggle favorite article: ", error)
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

let component = ReasonReact.reducerComponent("Home");

let make = (~user, _children) => {
  ...component,
  initialState: () => {
    articles: RemoteData.NotAsked,
    tags: RemoteData.NotAsked,
    articlesCount: 0.,
    currentPage: 1,
    feed: Global,
    togglingFavorites: Belt.Map.String.empty,
  },
  reducer: (action, state) =>
    switch (action) {
    | ToggleFavorite(slug, value) =>
      let togglingFavorites =
        state.togglingFavorites
        |. Belt.Map.String.update(slug, _previous => Some(value));
      ReasonReact.Update({...state, togglingFavorites});
    | ChangeFeed(feed, page) =>
      ReasonReact.UpdateWithSideEffects(
        {...state, feed, currentPage: page},
        (
          ({handle}) => {
            switch (feed) {
            | Global => handle(loadGlobalFeed(~page), ())
            | Your => handle(loadYourFeed(~page), ())
            | Tag(tag) => handle(loadGlobalFeed(~page, ~tag), ())
            };
            ignore();
          }
        ),
      )
    | UpdateTags(tags) => ReasonReact.Update({...state, tags})
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
  didMount: ({handle}) => handle(initialData(~user), ()),
  didUpdate: ({newSelf}) => newSelf.handle(initialData(~user), ()),
  render: ({state, handle, send}) => {
    let {articles, tags, articlesCount, currentPage, feed, togglingFavorites} = state;
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font"> ("conduit" |> strEl) </h1>
          <p> ("A place to share your knowledge." |> strEl) </p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                (
                  switch (user) {
                  | NotAsked
                  | Loading
                  | Failure(_) => nullEl
                  | Success(_) =>
                    <li className="nav-item">
                      <a
                        href="#"
                        className=(
                          "nav-link" ++ (feed === Your ? " active" : "")
                        )
                        onClick=(handle(onYourFeedClick(~feed)))>
                        ("Your Feed" |> strEl)
                      </a>
                    </li>
                  }
                )
                <li className="nav-item">
                  <a
                    href="#"
                    className=(
                      "nav-link" ++ (feed === Global ? " active" : "")
                    )
                    onClick=(handle(onGlobalFeedClick(~feed)))>
                    ("Global Feed" |> strEl)
                  </a>
                </li>
                (
                  switch (feed) {
                  | Tag(tag) =>
                    <li className="nav-item">
                      <a className="nav-link active">
                        ("#" ++ tag |> strEl)
                      </a>
                    </li>
                  | Your
                  | Global => nullEl
                  }
                )
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
                  onPageClick=(page => send(ChangeFeed(feed, page)))
                  currentPage
                />
              }
            )
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p> ("Popular Tags" |> strEl) </p>
              <div className="tag-list">
                (
                  switch (tags) {
                  | NotAsked => "Initializing..." |> strEl
                  | Loading => "Loading..." |> strEl
                  | Failure(error) => "ERROR: " ++ error |> strEl
                  | Success(data) =>
                    data
                    |. Belt.List.mapU((. item) =>
                         <a
                           key=item
                           className="tag-pill tag-default"
                           href="#"
                           onClick=(
                             event => {
                               event |> ReactEventRe.Mouse.preventDefault;
                               send(ChangeFeed(Tag(item), 1));
                             }
                           )>
                           (item |> strEl)
                         </a>
                       )
                    |> Belt.List.toArray
                    |> arrayEl
                  }
                )
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  },
};
