open Utils;

type remoteArticles = RemoteData.t(list(Types.article), string);

type remoteTags = RemoteData.t(list(string), string);

type selectedTag = option(string);

type action =
  | SelectTag(selectedTag)
  | UpdateTags(remoteTags)
  | UpdateArticles((remoteArticles, float, int));

type state = {
  articles: remoteArticles,
  tags: remoteTags,
  selectedTag,
  articlesCount: float,
  currentPage: int,
};

let pageNum = 10.;

let component = ReasonReact.reducerComponent("Home");

let loadData = (~tag=?, ~page=1, _payload, {ReasonReact.send, state}) => {
  open Js.Promise;
  let offset = (float_of_int(page) -. 1.) *. pageNum |> int_of_float;
  send(UpdateArticles((RemoteData.Loading, 0., page)));
  API.listArticles(~tag?, ~offset, ~limit=pageNum |> int_of_float, ())
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

let changeCurrentPage = (page, event, {ReasonReact.handle, state}) => {
  event |> ReactEventRe.Mouse.preventDefault;
  handle(loadData(~tag=?state.selectedTag, ~page), ());
};

let make = _children => {
  ...component,
  initialState: () => {
    articles: RemoteData.NotAsked,
    tags: RemoteData.NotAsked,
    selectedTag: None,
    articlesCount: 0.,
    currentPage: 1,
  },
  reducer: (action, state) =>
    switch (action) {
    | SelectTag(selectedTag) =>
      ReasonReact.UpdateWithSideEffects(
        {...state, selectedTag},
        (({handle}) => handle(loadData(~tag=?selectedTag), ())),
      )
    | UpdateTags(tags) => ReasonReact.Update({...state, tags})
    | UpdateArticles((articles, articlesCount, currentPage)) =>
      ReasonReact.Update({...state, articles, articlesCount, currentPage})
    },
  didMount: ({handle}) => {
    handle(loadData, ());
    ReasonReact.NoUpdate;
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
            (
              switch (articles) {
              | NotAsked
              | Loading
              | Failure(_) => nullEl
              | Success(_) =>
                <nav>
                  <ul className="pagination">
                    (
                      articlesCount
                      /. pageNum
                      |> ceil
                      |> int_of_float
                      |. Belt.List.makeBy(i => i + 1)
                      |. Belt.List.mapU((. page) =>
                           <li
                             className=(
                               "page-item"
                               ++ (page === currentPage ? " active" : "")
                             )
                             onClick=(handle(changeCurrentPage(page)))>
                             <a
                               className="page-link"
                               href=("#" ++ (page |> string_of_int))>
                               (page |> string_of_int |> strEl)
                             </a>
                           </li>
                         )
                      |> Belt.List.toArray
                      |> arrayEl
                    )
                  </ul>
                </nav>
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
