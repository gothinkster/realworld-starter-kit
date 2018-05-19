open Utils;

type action =
  | ToggleArticleAuthorFollowing(bool)
  | ToggleArticleFavorite(bool)
  | UpdateFollowAction(Types.remoteAction)
  | UpdateFavoriteAction(Types.remoteAction)
  | RemoveComment(int)
  | AddHidingDeleteIcon(int)
  | PrependNewComment(Types.comment)
  | UpdateComments(Types.remoteComments)
  | UpdateArticle(Types.remoteArticle);

type state = {
  followAction: Types.remoteAction,
  favoriteAction: Types.remoteAction,
  article: Types.remoteArticle,
  comments: Types.remoteComments,
  hidingDeleteIcons: list(int),
};

let redirectToLoginPage = _never => ReasonReact.Router.push("/#/login");

let isAuthor = (~user: Types.remoteUser, ~article: Types.remoteArticle) =>
  switch (user) {
  | RemoteData.NotAsked
  | Loading
  | Failure(_) => false
  | Success(userVal) =>
    switch (article) {
    | RemoteData.Success(articleVal)
        when articleVal.author.username === userVal.username =>
      true
    | NotAsked
    | Loading
    | Success(_)
    | Failure(_) => false
    }
  };

module FavoriteOrDeleteButton = {
  let component = ReasonReact.statelessComponent("FavoriteOrDeleteButton");
  let make =
      (
        ~disabled=false,
        ~user: Types.remoteUser,
        ~article: Types.remoteArticle,
        ~onFavoriteClick=_event => ignore(),
        ~onDeleteClick=_event => ignore(),
        _children,
      ) => {
    ...component,
    render: _self => {
      let isLogon = user |> RemoteData.isSuccess;
      let isAuthor = isAuthor(~user, ~article);
      let (favoritesCount, favorited) =
        switch (article) {
        | RemoteData.NotAsked
        | Loading
        | Failure(_) => (0, false)
        | Success({favoritesCount, favorited}) => (favoritesCount, favorited)
        };
      <button
        className=(
          switch (isAuthor, favorited) {
          | (true, true | false) => "btn btn-sm btn-outline-danger"
          | (false, favorited) =>
            "btn btn-sm "
            ++ (favorited ? "btn-primary" : "btn-outline-primary")
          }
        )
        onClick=(
          disabled ?
            ignore :
            (
              switch (isLogon, isAuthor) {
              | (false, true | false) => redirectToLoginPage
              | (true, true) => onDeleteClick
              | (true, false) => onFavoriteClick
              }
            )
        )
        disabled>
        <i className=(isAuthor ? "ion-trash-a" : "ion-heart") />
        (
          (
            switch (isAuthor, favorited) {
            | (true, true | false) => " Delete Article "
            | (false, favorited) =>
              favorited ? " Unfavorite Post " : " Favorite Post "
            }
          )
          |> strEl
        )
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
        ~disabled=false,
        ~user: Types.remoteUser,
        ~article: Types.remoteArticle,
        ~onFollowClick=_event => ignore(),
        ~onEditClick=_event => ignore(),
        _children,
      ) => {
    ...component,
    render: _self => {
      let isLogon = user |> RemoteData.isSuccess;
      let isAuthor = isAuthor(~user, ~article);
      let (username, following) =
        switch (article) {
        | RemoteData.NotAsked
        | Loading
        | Failure(_) => ("", false)
        | Success({author: {username, following}}) => (username, following)
        };
      <button
        className=(
          switch (isAuthor, following) {
          | (true, true | false) => "btn btn-sm btn-outline-secondary"
          | (false, following) =>
            "btn btn-sm "
            ++ (following ? "btn-secondary" : "btn-outline-secondary")
          }
        )
        onClick=(
          disabled ?
            ignore :
            (
              switch (isLogon, isAuthor) {
              | (false, true | false) => redirectToLoginPage
              | (true, true) => onEditClick
              | (true, false) => onFollowClick
              }
            )
        )
        disabled>
        <i className=(isAuthor ? "ion-edit" : "ion-plus-round") />
        (
          (
            switch (isAuthor, following) {
            | (true, true | false) => " Edit Article "
            | (false, following) =>
              (following ? " Unfollow " : " Follow ") ++ username
            }
          )
          |> strEl
        )
      </button>;
    },
  };
};

module CommentCard = {
  let component = ReasonReact.statelessComponent("CommentCard");
  let make =
      (
        ~hideDeleteIcon=false,
        ~onDeleteClick,
        ~data,
        ~user: Types.remoteUser,
        _children,
      ) => {
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
            | Success(userVal)
                when userVal.username === author.username && ! hideDeleteIcon =>
              <span className="mod-options">
                <i className="ion-trash-a" onClick=onDeleteClick />
              </span>
            | NotAsked
            | Loading
            | Failure(_)
            | Success(_) => nullEl
            }
          )
        </div>
      </div>;
    },
  };
};

let loadArticle = (slug, {ReasonReact.send}) => {
  Js.Promise.(
    API.getArticle(~slug)
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

let favoriteArticle =
    (~article: Types.remoteArticle, _payload, {ReasonReact.send}) =>
  switch (article) {
  | Loading
  | NotAsked
  | Failure(_) => ignore()
  | Success({slug}) =>
    open Js.Promise;
    send(UpdateFavoriteAction(RemoteData.Loading));
    API.favoriteArticle(slug)
    |> then_(result => {
         switch (result) {
         | Js.Result.Ok(json) =>
           let {favorited}: Types.article =
             json |> Json.Decode.(field("article", Decoder.article));
           send(ToggleArticleFavorite(favorited));
         | Error(error) => Js.log2("failed to favorite article", error)
         };
         send(UpdateFavoriteAction(RemoteData.NotAsked));
         ignore() |> resolve;
       })
    |> catch(error => {
         Js.log2("failed to favorite article", error);
         send(UpdateFavoriteAction(RemoteData.NotAsked));
         ignore() |> resolve;
       })
    |> ignore;
  };

let deleteArticle = (~article: Types.remoteArticle, _payload, _self) => {
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

let redirectToEditorPage = (~article: Types.remoteArticle, _payload, _self) =>
  switch (article) {
  | Loading
  | NotAsked
  | Failure(_) => ignore()
  | Success({slug}) => ReasonReact.Router.push("/#/editor/" ++ slug)
  };

let followUser =
    (~article: Types.remoteArticle, _payload, {ReasonReact.send}) =>
  switch (article) {
  | Loading
  | NotAsked
  | Failure(_) => ignore()
  | Success({author: {username}}) =>
    open Js.Promise;
    send(UpdateFollowAction(RemoteData.Loading));
    API.followUser(username)
    |> then_(result => {
         switch (result) {
         | Js.Result.Ok(json) =>
           let {following}: Types.profile =
             json |> Json.Decode.(field("profile", Decoder.profile));
           send(ToggleArticleAuthorFollowing(following));
         | Error(error) => Js.log2("failed to follow user", error)
         };
         send(UpdateFollowAction(RemoteData.NotAsked));
         ignore() |> resolve;
       })
    |> catch(error => {
         Js.log2("failed to follow user", error);
         send(UpdateFollowAction(RemoteData.NotAsked));
         ignore() |> resolve;
       })
    |> ignore;
  };

let addComments = (~slug, ~submissionCallbacks, state, {ReasonReact.send}) => {
  open Js.Promise;
  let {Formality__Form.Validation.notifyOnFailure, notifyOnSuccess, reset} = submissionCallbacks;
  API.addCommentsToAnArticle(~slug, ~body=state)
  |> then_(result => {
       switch (result) {
       | Js.Result.Ok(json) =>
         let comment = json |> Json.Decode.field("comment", Decoder.comment);
         notifyOnSuccess(None);
         reset();
         send(PrependNewComment(comment));
       | Error(error) =>
         let errors =
           error |> Json.Decode.(field("errors", dict(array(string))));
         let fieldErrors =
           [
             errors
             |. Js.Dict.get("body")
             |> getFirstError(Comment.Form.Body, "Comment"),
           ]
           |. Belt.List.keepMapU((. opt) => opt);
         notifyOnFailure(fieldErrors, None);
       };
       ignore() |> resolve;
     })
  |> catch(error => {
       Js.log2("There has been a problem with fetch operation: ", error);
       notifyOnFailure([], Some("failed to add comment to article"));
       ignore() |> resolve;
     })
  |> ignore;
};

let deleteComment = (~slug, ~id, _event, {ReasonReact.send}) => {
  open Js.Promise;
  send(AddHidingDeleteIcon(id));
  API.deleteComment(~slug, ~id)
  |> then_(result => {
       switch (result) {
       | Js.Result.Ok(_) => send(RemoveComment(id))
       | Error(error) => Js.log2("failed to delete comment", error)
       };
       ignore() |> resolve;
     })
  |> catch(error => {
       Js.log2("There has been a problem with fetch operation: ", error);
       ignore() |> resolve;
     })
  |> ignore;
  ignore();
};

let component = ReasonReact.reducerComponent("Article");

let make = (~user: Types.remoteUser, ~slug, _children) => {
  ...component,
  initialState: () => {
    followAction: RemoteData.NotAsked,
    favoriteAction: RemoteData.NotAsked,
    article: RemoteData.NotAsked,
    comments: RemoteData.NotAsked,
    hidingDeleteIcons: [],
  },
  reducer: (action, state) =>
    switch (action) {
    | ToggleArticleAuthorFollowing(following) =>
      ReasonReact.Update({
        ...state,
        article:
          state.article
          |> RemoteData.map(article => {
               let {author}: Types.article = article;
               {
                 ...article,
                 author: {
                   ...author,
                   following,
                 },
               };
             }),
      })
    | ToggleArticleFavorite(favorited) =>
      ReasonReact.Update({
        ...state,
        article:
          state.article
          |> RemoteData.map(article =>
               {
                 ...article,
                 Types.favorited,
                 favoritesCount:
                   favorited ?
                     Types.(article.favoritesCount) + 1 :
                     article.favoritesCount - 1,
               }
             ),
      })
    | UpdateFollowAction(followAction) =>
      ReasonReact.Update({...state, followAction})
    | UpdateFavoriteAction(favoriteAction) =>
      ReasonReact.Update({...state, favoriteAction})
    | RemoveComment(id) =>
      let comments =
        switch (state.comments) {
        | NotAsked
        | Loading
        | Failure(_) => state.comments
        | Success(comments) =>
          RemoteData.Success(comments |. Belt.List.keep(x => x.id !== id))
        };
      ReasonReact.Update({...state, comments});
    | AddHidingDeleteIcon(id) =>
      ReasonReact.Update({
        ...state,
        hidingDeleteIcons: [id, ...state.hidingDeleteIcons],
      })
    | PrependNewComment(comment) =>
      let comments =
        switch (state.comments) {
        | NotAsked
        | Loading
        | Failure(_) => state.comments
        | Success(comments) => RemoteData.Success([comment, ...comments])
        };
      ReasonReact.Update({...state, comments});
    | UpdateComments(comments) => ReasonReact.Update({...state, comments})
    | UpdateArticle(article) => ReasonReact.Update({...state, article})
    },
  didMount: ({handle}) => {
    handle(loadArticle, slug);
    handle(loadComments, slug);
  },
  render: ({state, handle}) => {
    let {followAction, favoriteAction, article, comments, hidingDeleteIcons} = state;
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
              user
              article
              onEditClick=(handle(redirectToEditorPage(~article)))
              onFollowClick=(handle(followUser(~article)))
              disabled=(followAction |> RemoteData.isLoading)
            />
            (" " |> strEl)
            <FavoriteOrDeleteButton
              user
              article
              onFavoriteClick=(handle(favoriteArticle(~article)))
              onDeleteClick=(handle(deleteArticle(~article)))
              disabled=(favoriteAction |> RemoteData.isLoading)
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
              user
              article
              onEditClick=(handle(redirectToEditorPage(~article)))
              onFollowClick=(handle(followUser(~article)))
              disabled=(followAction |> RemoteData.isLoading)
            />
            (" " |> strEl)
            <FavoriteOrDeleteButton
              user
              article
              onFavoriteClick=(handle(favoriteArticle(~article)))
              onDeleteClick=(handle(deleteArticle(~article)))
              disabled=(favoriteAction |> RemoteData.isLoading)
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <Comment
              user
              onSubmit=(
                (state, submissionCallbacks) =>
                  handle(
                    addComments(
                      ~slug=
                        switch (article) {
                        | NotAsked
                        | Loading
                        | Failure(_) => ""
                        | Success({slug}) => slug
                        },
                      ~submissionCallbacks,
                    ),
                    state,
                  )
              )
            />
            (
              switch (comments) {
              | NotAsked => "Initilizing..." |> strEl
              | Loading => "Loading..." |> strEl
              | Failure(error) => error |> strEl
              | Success(data) =>
                let shouldHideDeleteIcon = hidingDeleteIcons |> Belt.List.some;
                data
                |. Belt.List.mapU((. comment) => {
                     let {Types.id} = comment;
                     <CommentCard
                       key=(id |> string_of_int)
                       data=comment
                       user
                       onDeleteClick=(handle(deleteComment(~slug, ~id)))
                       hideDeleteIcon=(shouldHideDeleteIcon(x => x === id))
                     />;
                   })
                |> Belt.List.toArray
                |> arrayEl;
              }
            )
          </div>
        </div>
      </div>
    </div>;
  },
};
