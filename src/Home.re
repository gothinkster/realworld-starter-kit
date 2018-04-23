open Utils;

type selectedFeed =
  | Global
  | Your;

type selectedTag = option(string);

type action =
  | SelectFeed(selectedFeed)
  | SelectTag(selectedTag)
  | UpdateTags(Types.remoteTags)
  | UpdateArticles((Types.remoteArticles, float, int));

type state = {
  articles: Types.remoteArticles,
  tags: Types.remoteTags,
  selectedTag,
  articlesCount: float,
  currentPage: int,
  selectedFeed,
};

let pageNum = 10.;

let component = ReasonReact.reducerComponent("Home");

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

let selectTag = (~tag, event, {ReasonReact.send}) => {
  event |> ReactEventRe.Mouse.preventDefault;
  send(SelectTag(tag));
};

let changeCurrentPage = (~user, page, {ReasonReact.handle, state}) =>
  switch (user) {
  | RemoteData.NotAsked
  | Loading => ignore()
  | Success(_) => handle(loadYourFeed(~page), ())
  | Failure(_) => handle(loadGlobalFeed(~tag=?state.selectedTag, ~page), ())
  };

let initialData = (~user, _payload, {ReasonReact.state, handle, send}) => {
  let {articles} = state;
  switch (articles, user) {
  | (NotAsked, RemoteData.Success(_)) =>
    handle(loadYourFeed, ());
    send(SelectFeed(Your));
  | (NotAsked, Failure(_)) =>
    handle(loadGlobalFeed, ());
    send(SelectFeed(Global));
  | (NotAsked, NotAsked | Loading)
  | (
      Loading | Success(_) | Failure(_),
      NotAsked | Loading | Success(_) | Failure(_),
    ) =>
    ignore()
  };
};

let make = (~user, _children) => {
  ...component,
  initialState: () => {
    articles: RemoteData.NotAsked,
    tags: RemoteData.NotAsked,
    selectedTag: None,
    articlesCount: 0.,
    currentPage: 1,
    selectedFeed: Global,
  },
  reducer: (action, state) =>
    switch (action) {
    | SelectFeed(selectedFeed) =>
      ReasonReact.Update({...state, selectedFeed})
    | SelectTag(selectedTag) =>
      ReasonReact.UpdateWithSideEffects(
        {...state, selectedTag},
        (({handle}) => handle(loadGlobalFeed(~tag=?selectedTag), ())),
      )
    | UpdateTags(tags) => ReasonReact.Update({...state, tags})
    | UpdateArticles((articles, articlesCount, currentPage)) =>
      ReasonReact.Update({...state, articles, articlesCount, currentPage})
    },
  didMount: ({handle}) => {
    handle(initialData(~user), ());
    ReasonReact.NoUpdate;
  },
  didUpdate: ({newSelf}) => {
    newSelf.handle(initialData(~user), ());
    ignore();
  },
  render: ({state, handle}) => {
    let {articles, tags, selectedTag, articlesCount, currentPage} = state;
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
                          "nav-link"
                          ++ (
                            switch (selectedTag, user) {
                            | (None, Success(_)) => " active"
                            | (None, NotAsked | Loading | Failure(_))
                            | (
                                Some(_),
                                NotAsked | Loading | Success(_) | Failure(_),
                              ) => ""
                            }
                          )
                        )
                        onClick=(
                          switch (selectedTag) {
                          | Some(_) => handle(selectTag(~tag=None))
                          | None => ignore
                          }
                        )>
                        ("Your Feed" |> strEl)
                      </a>
                    </li>
                  }
                )
                <li className="nav-item">
                  <a
                    href="#"
                    className=(
                      "nav-link"
                      ++ (
                        switch (selectedTag, user) {
                        | (None, NotAsked | Loading | Failure(_)) => " active"
                        | (None, Success(_))
                        | (
                            Some(_),
                            NotAsked | Loading | Success(_) | Failure(_),
                          ) => ""
                        }
                      )
                    )
                    onClick=(
                      switch (selectedTag) {
                      | Some(_) => handle(selectTag(~tag=None))
                      | None => ignore
                      }
                    )>
                    ("Global Feed" |> strEl)
                  </a>
                </li>
                (
                  switch (selectedTag) {
                  | Some(tag) =>
                    <li className="nav-item">
                      <a className="nav-link active">
                        ("#" ++ tag |> strEl)
                      </a>
                    </li>
                  | None => nullEl
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
                     <ArticleItem key=value.slug value />
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
                  onPageClick=(handle(changeCurrentPage(~user)))
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
                           onClick=(handle(selectTag(~tag=Some(item))))>
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
