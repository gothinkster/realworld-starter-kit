open Utils;

type state = {
  profile: Types.remoteProfile,
  articles: Types.remoteArticles,
  articlesCount: float,
};

type action =
  | UpdateProfile(Types.remoteProfile)
  | UpdateArticles((Types.remoteArticles, float));

let component = ReasonReact.reducerComponent("Profile");

let loadProfile = (payload: Types.articleByAuthor, {ReasonReact.send}) => {
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
  let (author, favorited) =
    switch (payload) {
    | Author(v) => (Some(v), None)
    | Favorited(v) => (None, Some(v))
    };
  send(UpdateArticles((RemoteData.Loading, 0.)));
  API.listArticles(~author?, ~favorited?, ())
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

let make = (~author: Types.articleByAuthor, _children) => {
  ...component,
  initialState: () => {
    profile: RemoteData.NotAsked,
    articles: RemoteData.NotAsked,
    articlesCount: 0.,
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
  render: ({state}) => {
    let {articles, articlesCount, profile} = state;
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
                  | Loading => nullEl
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
                  <a className="nav-link active" href="">
                    ("My Articles" |> strEl)
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    ("Favorited Articles" |> strEl)
                  </a>
                </li>
              </ul>
            </div>
            <div className="article-preview">
              <div className="article-meta">
                <a href=""> <img src="http://i.imgur.com/Qr71crq.jpg" /> </a>
                <div className="info">
                  <a href="" className="author"> ("Eric Simons" |> strEl) </a>
                  <span className="date"> ("January 20th" |> strEl) </span>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart" />
                  ("29" |> strEl)
                </button>
              </div>
              <a href="" className="preview-link">
                <h1> ("How to build webapps that scale" |> strEl) </h1>
                <p> ("This is the description for the post." |> strEl) </p>
                <span> ("Read more..." |> strEl) </span>
              </a>
            </div>
            <div className="article-preview">
              <div className="article-meta">
                <a href=""> <img src="http://i.imgur.com/N4VcUeJ.jpg" /> </a>
                <div className="info">
                  <a href="" className="author"> ("Albert Pai" |> strEl) </a>
                  <span className="date"> ("January 20th" |> strEl) </span>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart" />
                  ("32" |> strEl)
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>
                  (
                    "The song you won't ever stop singing. No matter how hard you try."
                    |> strEl
                  )
                </h1>
                <p> ("This is the description for the post." |> strEl) </p>
                <span> ("Read more..." |> strEl) </span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">
                    ("Music" |> strEl)
                  </li>
                  <li className="tag-default tag-pill tag-outline">
                    ("Song" |> strEl)
                  </li>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>;
  },
};
