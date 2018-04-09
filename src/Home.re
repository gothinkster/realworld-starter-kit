open Utils;

type remoteArticles = RemoteData.t(list(Types.article), string);

type remoteTags = RemoteData.t(list(string), string);

type selectedTag = option(string);

type action =
  | SelectTag(selectedTag)
  | UpdateTags(remoteTags)
  | UpdateArticles(remoteArticles);

type state = {
  articles: remoteArticles,
  tags: remoteTags,
  selectedTag,
};

let component = ReasonReact.reducerComponent("Home");

let loadData = (~tag=?, _payload, {ReasonReact.send, state}) => {
  open Js.Promise;
  send(UpdateArticles(RemoteData.Loading));
  API.listArticles(~tag?, ())
  |> then_(result => {
       switch (result) {
       | Js.Result.Ok(json) =>
         let articles =
           json
           |> Json.Decode.(field("articles", array(Decoder.article)))
           |> Belt.List.fromArray;
         send(UpdateArticles(RemoteData.Success(articles)));
       | Error(error) => Js.log2("failed to get list of articles", error)
       };
       ignore() |> resolve;
     })
  |> ignore;
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
         | Error(error) => Js.log2("failed to get list of tags", error)
         };
         ignore() |> resolve;
       })
    |> ignore;
  | Loading
  | Success(_)
  | Failure(_) => ignore()
  };
};

let selectTag = (tag, event, {ReasonReact.send}) => {
  event |> ReactEventRe.Mouse.preventDefault;
  send(SelectTag(tag));
};

let make = _children => {
  ...component,
  initialState: () => {
    articles: RemoteData.NotAsked,
    tags: RemoteData.NotAsked,
    selectedTag: None,
  },
  reducer: (action, state) =>
    switch (action) {
    | SelectTag(selectedTag) =>
      ReasonReact.UpdateWithSideEffects(
        {...state, selectedTag},
        (({handle}) => handle(loadData(~tag=?selectedTag), ())),
      )
    | UpdateTags(tags) => ReasonReact.Update({...state, tags})
    | UpdateArticles(articles) => ReasonReact.Update({...state, articles})
    },
  didMount: ({handle}) => {
    handle(loadData, ());
    ReasonReact.NoUpdate;
  },
  render: ({state, handle}) => {
    let {articles, tags, selectedTag} = state;
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
                <li className="nav-item">
                  <a
                    href="#"
                    className=(
                      "nav-link"
                      ++ (
                        switch (selectedTag) {
                        | None => " active"
                        | Some(_) => ""
                        }
                      )
                    )
                    onClick=(
                      switch (selectedTag) {
                      | Some(_) => handle(selectTag(None))
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
                |. Belt.List.mapU((. item: Types.article) =>
                     <div key=item.slug className="article-preview">
                       <div className="article-meta">
                         <a href=("/#/profile/" ++ item.author.username)>
                           <img src=item.author.image />
                         </a>
                         <div className="info">
                           <a
                             href=("/#/profile/" ++ item.author.username)
                             className="author">
                             (item.author.username |> strEl)
                           </a>
                           <span className="date">
                             (item.createdAt |> Js.Date.toUTCString |> strEl)
                           </span>
                         </div>
                         <button
                           className="btn btn-outline-primary btn-sm pull-xs-right">
                           <i className="ion-heart" />
                           (
                             " "
                             ++ (item.favoritesCount |> string_of_int)
                             |> strEl
                           )
                         </button>
                       </div>
                       <a
                         href=("/#/article/" ++ item.slug)
                         className="preview-link">
                         <h1> (item.title |> strEl) </h1>
                         <p> (item.description |> strEl) </p>
                         <span> ("Read more..." |> strEl) </span>
                       </a>
                     </div>
                   )
                |> Belt.List.toArray
                |> arrayEl
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
                           onClick=(handle(selectTag(Some(item))))>
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
