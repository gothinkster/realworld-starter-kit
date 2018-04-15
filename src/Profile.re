open Utils;

type state = {
  profile: Types.remoteProfile,
  articles: Types.remoteArticles,
  articlesCount: float,
  currentPage: int,
};

type action =
  | UpdateProfile(Types.remoteProfile)
  | UpdateArticles((Types.remoteArticles, float));

let pageNum = 10.;

let getAuthorParam =
  fun
  | Types.Author(v) => (Some(v), None)
  | Favorited(v) => (None, Some(v));

let component = ReasonReact.reducerComponent("Profile");

let loadArticles =
    (~author, ~favorited, ~page=1, _payload, {ReasonReact.send}) => {
  open Js.Promise;
  let limit = pageNum |> int_of_float;
  let offset = (float_of_int(page) -. 1.) *. pageNum |> int_of_float;
  send(UpdateArticles((RemoteData.Loading, 0.)));
  API.listArticles(~author?, ~favorited?, ~offset, ~limit, ())
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
           UpdateArticles((RemoteData.Success(articles), articlesCount)),
         );
       | Error(error) =>
         send(UpdateArticles((RemoteData.Failure(error), 0.)))
       };
       ignore() |> resolve;
     })
  |> catch(_error =>
       send(
         UpdateArticles((
           RemoteData.Failure("failed to fetch list of articles by author"),
           0.,
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
         | Js.Result.Ok(json) =>
           let profile =
             json |> Json.Decode.(field("profile", Decoder.profile));
           send(UpdateProfile(RemoteData.Success(profile)));
         | Error(error) => send(UpdateProfile(RemoteData.Failure(error)))
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

let make = (~author: Types.articleByAuthor, _children) => {
  ...component,
  initialState: () => {
    profile: RemoteData.NotAsked,
    articles: RemoteData.NotAsked,
    articlesCount: 0.,
    currentPage: 1,
  },
  reducer: (action, state) =>
    switch (action) {
    | UpdateProfile(profile) => ReasonReact.Update({...state, profile})
    | UpdateArticles((articles, articlesCount)) =>
      ReasonReact.Update({...state, articles, articlesCount})
    },
  didMount: ({handle}) => {
    handle(loadProfile, author);
    ReasonReact.NoUpdate;
  },
  render: ({state, handle}) => {
    let {currentPage, articles, articlesCount, profile} = state;
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
                  | Loading => "//placehold.it/100x100"
                  | Success({image}) => image
                  | Failure(_) => "//placehold.it/100x100"
                  }
                )
                className="user-img"
              />
              <h4>
                (
                  switch (profile) {
                  | NotAsked
                  | Loading => nullEl
                  | Success({username}) => username |> strEl
                  | Failure(_) => nullEl
                  }
                )
              </h4>
              <p>
                (
                  switch (profile) {
                  | NotAsked
                  | Loading => nullEl
                  | Success({bio}) =>
                    switch (bio) {
                    | Some(v) => v |> strEl
                    | None => nullEl
                    }
                  | Failure(_) => nullEl
                  }
                )
              </p>
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round" />
                (
                  switch (profile) {
                  | NotAsked
                  | Loading => "..." |> strEl
                  | Success({username}) => " Follow " ++ username |> strEl
                  | Failure(_) => nullEl
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
