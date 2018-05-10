open Utils;

type action =
  | UpdateComments(Types.remoteComments)
  | UpdateArticle(Types.remoteArticle);

type state = {
  article: Types.remoteArticle,
  comments: Types.remoteComments,
};

module FavoriteOrDeleteButton = {
  let component = ReasonReact.statelessComponent("FavoriteOrDeleteButton");
  let make =
      (
        ~user: Types.remoteUser,
        ~article: Types.remoteArticle,
        ~favoriteClassName="",
        ~deleteClassName="",
        ~onFavoriteClick=_event => ignore(),
        ~onDeleteClick=_event => ignore(),
        _children,
      ) => {
    ...component,
    render: _self => {
      let (isAuthor, favoritesCount) =
        switch (user, article) {
        | (
            RemoteData.NotAsked | Loading | Failure(_),
            RemoteData.NotAsked | Loading | Failure(_),
          )
        | (Success(_), NotAsked | Loading | Failure(_)) => (false, 0)
        | (Success(userVal), Success(articleVal))
            when userVal.username === articleVal.author.username => (
            true,
            0,
          )
        | (NotAsked | Loading | Failure(_), Success({favoritesCount}))
        | (Success(_), Success({favoritesCount})) => (false, favoritesCount)
        };
      <button
        className=(isAuthor ? deleteClassName : favoriteClassName)
        onClick=(isAuthor ? onDeleteClick : onFavoriteClick)>
        <i className=(isAuthor ? "ion-trash-a" : "ion-heart") />
        ((isAuthor ? " Delete Article " : " Favorite Post ") |> strEl)
        (
          isAuthor ?
            nullEl :
            <span className="counter">
              (" (" ++ string_of_int(favoritesCount) ++ ")" |> strEl)
            </span>
        )
      </button>;
    },
  };
};

module FollowOrEditButton = {
  let component = ReasonReact.statelessComponent("FollowOrEditButton");
  let make =
      (
        ~user: Types.remoteUser,
        ~article: Types.remoteArticle,
        ~followClassName="",
        ~editClassName="",
        ~onFollowClick=_event => ignore(),
        ~onEditClick=_event => ignore(),
        _children,
      ) => {
    ...component,
    render: _self => {
      let (isAuthor, username) =
        switch (user, article) {
        | (
            RemoteData.NotAsked | Loading | Failure(_),
            RemoteData.NotAsked | Loading | Failure(_),
          )
        | (Success(_), NotAsked | Loading | Failure(_)) => (false, "...")
        | (Success(userVal), Success(articleVal))
            when userVal.username === articleVal.author.username => (
            true,
            "",
          )
        | (NotAsked | Loading | Failure(_), Success({author: {username}}))
        | (Success(_), Success({author: {username}})) => (false, username)
        };
      <button
        className=(isAuthor ? editClassName : followClassName)
        onClick=(isAuthor ? onEditClick : onFollowClick)>
        <i className=(isAuthor ? "ion-edit" : "ion-plus-round") />
        ((isAuthor ? " Edit Article " : " Follow " ++ username) |> strEl)
      </button>;
    },
  };
};

module Img = {
  let component = ReasonReact.statelessComponent("Img");
  let make = (~src=None, ~width=30, ~height=30, ~className="", _children) => {
    ...component,
    render: _self =>
      <img
        className
        src=(
          src
          |. Belt.Option.getWithDefault(
               "//placehold.it/"
               ++ string_of_int(width)
               ++ "x"
               ++ string_of_int(height),
             )
        )
      />,
  };
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
            <Img src=(Some(author.image)) className="comment-author-img" />
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
         | Error(_) =>
           send(
             UpdateArticle(RemoteData.Failure("failed to fetch article")),
           )
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
         | Error(_) =>
           send(
             UpdateComments(
               RemoteData.Failure("failed to fetch list of commnets"),
             ),
           )
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

let favoriteArticle = (article: Types.remoteArticle) => {
  switch (article) {
  | Loading
  | NotAsked
  | Failure(_) => ignore()
  | Success({slug}) => Js.log("favorite:" ++ slug)
  };
  ignore();
};

let deleteArticle = (article: Types.remoteArticle) => {
  switch (article) {
  | Loading
  | NotAsked
  | Failure(_) => ignore()
  | Success({slug}) =>
    Js.Promise.(
      API.deleteArticle(slug)
      |> then_(result => {
           switch (result) {
           | Js.Result.Ok(_) => ReasonReact.Router.push("/#/")
           | Error(error) => Js.log(error)
           };
           ignore() |> resolve;
         })
    )
    |> ignore
  };
  ignore();
};

let redirectToEditorPage = (article: Types.remoteArticle) => {
  switch (article) {
  | Loading
  | NotAsked
  | Failure(_) => ignore()
  | Success({slug}) => ReasonReact.Router.push("/#/editor/" ++ slug)
  };
  ignore();
};

let followUser = (user: Types.remoteUser) => {
  switch (user) {
  | Loading
  | NotAsked
  | Failure(_) => ignore()
  | Success({username}) => Js.log("follow user: " ++ username)
  };
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
              (
                switch (article) {
                | NotAsked
                | Loading => <Img />
                | Success({author}) => <Img src=(Some(author.image)) />
                | Failure(_) => <Img />
                }
              )
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
            <FollowOrEditButton
              followClassName="btn btn-sm btn-outline-secondary"
              editClassName="btn btn-sm btn-outline-secondary"
              user
              article
              onEditClick=(_event => redirectToEditorPage(article))
              onFollowClick=(_event => followUser(user))
            />
            (" " |> strEl)
            <FavoriteOrDeleteButton
              favoriteClassName="btn btn-sm btn-outline-primary"
              deleteClassName="btn btn-sm btn-outline-danger"
              user
              article
              onFavoriteClick=(_event => favoriteArticle(article))
              onDeleteClick=(_event => deleteArticle(article))
            />
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
              (
                switch (article) {
                | NotAsked
                | Loading => <Img />
                | Success({author}) => <Img src=(Some(author.image)) />
                | Failure(_) => <Img />
                }
              )
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
            <FollowOrEditButton
              followClassName="btn btn-sm btn-outline-secondary"
              editClassName="btn btn-sm btn-outline-secondary"
              user
              article
              onEditClick=(_event => redirectToEditorPage(article))
              onFollowClick=(_event => followUser(user))
            />
            (" " |> strEl)
            <FavoriteOrDeleteButton
              favoriteClassName="btn btn-sm btn-outline-primary"
              deleteClassName="btn btn-sm btn-outline-danger"
              user
              article
              onFavoriteClick=(_event => favoriteArticle(article))
              onDeleteClick=(_event => deleteArticle(article))
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            (
              switch (user) {
              | NotAsked
              | Failure(_) =>
                <p>
                  <a href="#/login"> ("Sign in" |> strEl) </a>
                  (" or " |> strEl)
                  <a href="#/register"> ("sign up" |> strEl) </a>
                  (" to add comments on this article." |> strEl)
                </p>
              | Loading => "Loading..." |> strEl
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
                    <Img src=data.image className="comment-author-img" />
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
