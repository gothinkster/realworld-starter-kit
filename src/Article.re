open Utils;

type action =
  | UpdateComments(Types.remoteComments)
  | UpdateArticle(Types.remoteArticle);

type state = {
  article: Types.remoteArticle,
  comments: Types.remoteComments,
};

module Card = {
  let component = ReasonReact.statelessComponent("Card");
  let make = (~data, ~user: Types.remoteUser, _children) => {
    ...component,
    render: _self => {
      let {createdAt, body, author}: Types.comment = data;
      <div className="card">
        <div className="card-block">
          <p className="card-text"> (body |> strEl) </p>
        </div>
        <div className="card-footer">
          <a
            href=("/#/profile/" ++ author.username) className="comment-author">
            <img src=author.image className="comment-author-img" />
          </a>
          (" " |> strEl)
          <a
            href=("/#/profile/" ++ author.username) className="comment-author">
            (author.username |> strEl)
          </a>
          <span className="date-posted">
            (createdAt |> Js.Date.toISOString |> strEl)
          </span>
          (
            switch (user) {
            | NotAsked
            | Loading => nullEl
            | Failure(_) => nullEl
            | Success(_data) =>
              <span className="mod-options">
                <i className="ion-edit" />
                <i className="ion-trash-a" />
              </span>
            }
          )
        </div>
      </div>;
    },
  };
};

let component = ReasonReact.reducerComponent("Article");

let loadArticle = (slug, {ReasonReact.send}) => {
  Js.Promise.(
    API.article(~slug)
    |> then_(result => {
         switch (result) {
         | Js.Result.Ok(json) =>
           let article =
             json |> Json.Decode.(field("article", Decoder.article));
           send(UpdateArticle(RemoteData.Success(article)));
         | Error(error) => send(UpdateArticle(RemoteData.Failure(error)))
         };
         ignore() |> resolve;
       })
    |> catch(_error => {
         send(UpdateArticle(RemoteData.Failure("failed to fetch article")));
         ignore() |> resolve;
       })
    |> ignore
  );
  ignore();
};

let loadComments = (slug, {ReasonReact.send}) => {
  Js.Promise.(
    API.comments(~slug)
    |> then_(result => {
         switch (result) {
         | Js.Result.Ok(json) =>
           let comments =
             json
             |> Json.Decode.(field("comments", array(Decoder.comment)))
             |> Belt.List.fromArray;
           send(UpdateComments(RemoteData.Success(comments)));
         | Error(error) => send(UpdateComments(RemoteData.Failure(error)))
         };
         ignore() |> resolve;
       })
    |> catch(_error => {
         send(
           UpdateComments(
             RemoteData.Failure("failed to fetch list of commnets"),
           ),
         );
         ignore() |> resolve;
       })
    |> ignore
  );
  ignore();
};

let make = (~user: Types.remoteUser, ~slug, _children) => {
  ...component,
  initialState: () => {
    article: RemoteData.NotAsked,
    comments: RemoteData.NotAsked,
  },
  reducer: (action, state) =>
    switch (action) {
    | UpdateComments(comments) => ReasonReact.Update({...state, comments})
    | UpdateArticle(article) => ReasonReact.Update({...state, article})
    },
  didMount: ({handle}) => {
    handle(loadArticle, slug);
    handle(loadComments, slug);
    ReasonReact.NoUpdate;
  },
  render: ({state}) => {
    let {article, comments} = state;
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>
            (
              switch (article) {
              | NotAsked => nullEl
              | Loading => "..." |> strEl
              | Success({title}) => title |> strEl
              | Failure(_) => nullEl
              }
            )
          </h1>
          <div className="article-meta">
            <a
              href=(
                switch (article) {
                | NotAsked
                | Loading => ""
                | Success({author}) => "/#/profile/" ++ author.username
                | Failure(_) => ""
                }
              )>
              <img
                src=(
                  switch (article) {
                  | NotAsked
                  | Loading => "//placehold.it/100x100"
                  | Success({author}) => author.image
                  | Failure(_) => "//placehold.it/100x100"
                  }
                )
              />
            </a>
            <div className="info">
              <a
                href=(
                  switch (article) {
                  | NotAsked
                  | Loading => ""
                  | Success({author}) => "/#/profile/" ++ author.username
                  | Failure(_) => ""
                  }
                )
                className="author">
                (
                  (
                    switch (article) {
                    | NotAsked
                    | Loading => ""
                    | Success({author}) => author.username
                    | Failure(_) => ""
                    }
                  )
                  |> strEl
                )
              </a>
              <span className="date">
                (
                  switch (article) {
                  | NotAsked
                  | Loading => nullEl
                  | Success({updatedAt}) =>
                    updatedAt |> Js.Date.toISOString |> strEl
                  | Failure(_) => nullEl
                  }
                )
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              (
                " Follow "
                ++ (
                  switch (article) {
                  | NotAsked
                  | Loading => ""
                  | Success({author}) => author.username
                  | Failure(_) => ""
                  }
                )
                |> strEl
              )
            </button>
            (" " |> strEl)
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              (" Favorite Post " |> strEl)
              <span className="counter">
                (
                  " ("
                  ++ (
                    switch (article) {
                    | NotAsked
                    | Loading => "-"
                    | Success({favoritesCount}) =>
                      favoritesCount |> string_of_int
                    | Failure(_) => "-"
                    }
                  )
                  ++ ")"
                  |> strEl
                )
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          (
            switch (article) {
            | NotAsked => <div> ("Initilizing..." |> strEl) </div>
            | Loading => <div> ("Loading..." |> strEl) </div>
            | Success({body}) =>
              <div
                className="col-md-12"
                dangerouslySetInnerHTML={"__html": body}
              />
            | Failure(error) => <div> (error |> strEl) </div>
            }
          )
          (
            switch (article) {
            | NotAsked
            | Loading => nullEl
            | Failure(_) => nullEl
            | Success({tagList}) =>
              <ul className="tag-list">
                (
                  tagList
                  |. Belt.List.mapU((. item) =>
                       <li
                         key=item className="tag-default tag-pill tag-outline">
                         (item |> strEl)
                       </li>
                     )
                  |> Belt.List.toArray
                  |> arrayEl
                )
              </ul>
            }
          )
        </div>
        <hr />
        <div className="article-actions">
          <div className="article-meta">
            <a
              href=(
                switch (article) {
                | NotAsked
                | Loading => ""
                | Success({author}) => "/#/profile/" ++ author.username
                | Failure(_) => ""
                }
              )>
              <img
                src=(
                  switch (article) {
                  | NotAsked
                  | Loading => "//placehold.it/100x100"
                  | Success({author}) => author.image
                  | Failure(_) => "//placehold.it/100x100"
                  }
                )
              />
            </a>
            <div className="info">
              <a
                href=(
                  switch (article) {
                  | NotAsked
                  | Loading => ""
                  | Success({author}) => "/#/profile/" ++ author.username
                  | Failure(_) => ""
                  }
                )
                className="author">
                (
                  (
                    switch (article) {
                    | NotAsked
                    | Loading => ""
                    | Success({author}) => author.username
                    | Failure(_) => ""
                    }
                  )
                  |> strEl
                )
              </a>
              <span className="date">
                (
                  switch (article) {
                  | NotAsked
                  | Loading => nullEl
                  | Success({updatedAt}) =>
                    updatedAt |> Js.Date.toISOString |> strEl
                  | Failure(_) => nullEl
                  }
                )
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              (
                " Follow "
                ++ (
                  switch (article) {
                  | NotAsked
                  | Loading => ""
                  | Success({author}) => author.username
                  | Failure(_) => ""
                  }
                )
                |> strEl
              )
            </button>
            (" " |> strEl)
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              (" Favorite Post " |> strEl)
              <span className="counter">
                (
                  "("
                  ++ (
                    switch (article) {
                    | NotAsked
                    | Loading => "-"
                    | Success({favoritesCount}) =>
                      favoritesCount |> string_of_int
                    | Failure(_) => "-"
                    }
                  )
                  ++ ")"
                  |> strEl
                )
              </span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            (
              switch (user) {
              | NotAsked =>
                <p>
                  <a href="#/login"> ("Sign in" |> strEl) </a>
                  (" or " |> strEl)
                  <a href="#/register"> ("sign up" |> strEl) </a>
                  (" to add comments on this article." |> strEl)
                </p>
              | Loading => "Loading..." |> strEl
              | Failure(error) => error |> strEl
              | Success(data) =>
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows=3
                    />
                  </div>
                  <div className="card-footer">
                    <img src=data.username className="comment-author-img" />
                    <button className="btn btn-sm btn-primary">
                      ("Post Comment" |> strEl)
                    </button>
                  </div>
                </form>
              }
            )
            (
              switch (comments) {
              | NotAsked => "Initilizing..." |> strEl
              | Loading => "Loading..." |> strEl
              | Failure(error) => error |> strEl
              | Success(data) =>
                data
                |. Belt.List.mapU((. comment: Types.comment) =>
                     <Card
                       key=(comment.id |> string_of_int)
                       data=comment
                       user
                     />
                   )
                |> Belt.List.toArray
                |> arrayEl
              }
            )
          </div>
        </div>
      </div>
    </div>;
  },
};
