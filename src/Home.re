open Utils;

type remoteArticles = RemoteData.t(list(Types.article), string);

type remoteTags = RemoteData.t(list(string), string);

type action =
  | UpdateTags(remoteTags)
  | UpdateArticles(remoteArticles);

type state = {
  articles: remoteArticles,
  tags: remoteTags,
};

let component = ReasonReact.reducerComponent("Home");

let loadData = (_payload, {ReasonReact.send}) => {
  send(UpdateArticles(RemoteData.Loading));
  Js.Promise.(
    API.listArticles()
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
  )
  |> ignore;
};

let make = _children => {
  ...component,
  initialState: () => {
    articles: RemoteData.NotAsked,
    tags: RemoteData.NotAsked,
  },
  reducer: (action, state) =>
    switch (action) {
    | UpdateTags(tags) => ReasonReact.Update({...state, tags})
    | UpdateArticles(articles) => ReasonReact.Update({...state, articles})
    },
  didMount: ({handle}) => {
    handle(loadData, ());
    ReasonReact.NoUpdate;
  },
  render: ({state}) => {
    let {articles} = state;
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
                  <a className="nav-link disabled" href="">
                    ("Your Feed" |> strEl)
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    ("Global Feed" |> strEl)
                  </a>
                </li>
              </ul>
            </div>
            (
              switch (articles) {
              | NotAsked => "Initializing..." |> strEl
              | Loading => "Loading..." |> strEl
              | Failure(error) => "ERROR: " ++ error |> strEl
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
                           (item.favoritesCount |> string_of_int |> strEl)
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
                <a href="" className="tag-pill tag-default">
                  ("programming" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("javascript" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("emberjs" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("angularjs" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("react" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("mean" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("node" |> strEl)
                </a>
                <a href="" className="tag-pill tag-default">
                  ("rails" |> strEl)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  },
};
