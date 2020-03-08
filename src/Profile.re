module Option = Relude.Option;
module Result = Relude.Result;
module Array = Relude.Array;
module AsyncResult = Relude.AsyncResult;

[@react.component]
let make = (~viewMode: Shape.Profile.viewMode, ~user: option(Shape.User.t)) => {
  let (viewMode, changeOffset) = Hook.useViewMode(~route=viewMode);
  let (username, limit, offset) =
    switch (viewMode) {
    | Author(username, limit, offset) => (username, limit, offset)
    | Favorited(username, limit, offset) => (username, limit, offset)
    };
  let profile = Hook.useProfile(~username);
  let (articles, setArticles) = Hook.useArticlesInProfile(~viewMode);
  let (follow, onFollowClick) = Hook.useFollowInProfile(~profile, ~user);
  let (toggleFavoriteBusy, onToggleFavorite) =
    Hook.useToggleFavorite(~setArticles, ~user);
  let isArticlesBusy = articles |> AsyncResult.isBusy;

  <div className="profile-page">
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            {profile
             |> AsyncResult.getOk
             |> Option.flatMap((user: Shape.Author.t) =>
                  user.image == "" ? None : Some(user.image)
                )
             |> Option.map(src => <img src className="user-img" />)
             |> Option.getOrElse(<img className="user-img" />)}
            <h4>
              (
                switch (profile) {
                | Init
                | Loading
                | Reloading(Error(_))
                | Complete(Error(_)) => "..."
                | Reloading(Ok(user))
                | Complete(Ok(user)) => user.username
                }
              )
              ->React.string
            </h4>
            {switch (profile) {
             | Init
             | Loading
             | Reloading(Error(_))
             | Complete(Error(_)) => React.null
             | Reloading(Ok(user))
             | Complete(Ok(user)) =>
               user.bio
               |> Option.map(bio => bio |> React.string)
               |> Option.getOrElse(React.null)
             }}
            {switch (profile) {
             | Init
             | Loading
             | Reloading(Error(_))
             | Complete(Error(_)) => React.null
             | Reloading(Ok(_))
             | Complete(Ok(_)) =>
               <Link.Button
                 className={
                   switch (follow) {
                   | Init
                   | Loading
                   | Reloading((_, false))
                   | Complete((_, false)) => "btn btn-sm btn-outline-secondary action-btn"
                   | Reloading((_, true))
                   | Complete((_, true)) => "btn btn-sm btn-secondary action-btn"
                   }
                 }
                 onClick={
                   switch (follow, user) {
                   | (Init, Some(_) | None)
                   | (Loading, Some(_) | None)
                   | (Reloading((_, _)), Some(_) | None) =>
                     Link.customFn(ignore)
                   | (Complete((username, _)), user) =>
                     user
                     |> Option.flatMap((ok: Shape.User.t) =>
                          if (ok.username == username) {
                            Some(Link.settings |> Link.location);
                          } else {
                            None;
                          }
                        )
                     |> Option.getOrElse(onFollowClick)
                   }
                 }>
                 {switch (follow, user) {
                  | (Init, Some(_) | None) =>
                    <i
                      className="ion-plus-round"
                      style={ReactDOMRe.Style.make(~marginRight="3px", ())}
                    />
                  | (Loading, Some(_) | None)
                  | (Reloading((_, _)), _) =>
                    <i
                      className="ion-load-a"
                      style={ReactDOMRe.Style.make(~marginRight="3px", ())}
                    />
                  | (Complete((username, _following)), user) =>
                    user
                    |> Option.flatMap((ok: Shape.User.t) =>
                         if (ok.username == username) {
                           Some(
                             <i
                               className="ion-gear-a"
                               style={ReactDOMRe.Style.make(
                                 ~marginRight="3px",
                                 (),
                               )}
                             />,
                           );
                         } else {
                           None;
                         }
                       )
                    |> Option.getOrElse(
                         <i
                           className="ion-plus-round"
                           style={ReactDOMRe.Style.make(
                             ~marginRight="3px",
                             (),
                           )}
                         />,
                       )
                  }}
                 {switch (follow, user) {
                  | (Init, Some(_) | None)
                  | (Loading, Some(_) | None) => "..." |> React.string
                  | (Reloading((username, following)), user)
                  | (Complete((username, following)), user) =>
                    user
                    |> Option.flatMap((ok: Shape.User.t) =>
                         if (ok.username == username) {
                           Some("Edit Profile Settings");
                         } else {
                           None;
                         }
                       )
                    |> Option.getOrElse(
                         Printf.sprintf(
                           " %s %s",
                           following ? "Unfollow" : "Follow",
                           username,
                         ),
                       )
                    |> React.string
                  }}
               </Link.Button>
             }}
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
                <Link
                  className={
                    switch (viewMode) {
                    | Shape.Profile.Author(_) => "nav-link active"
                    | Favorited(_) => "nav-link"
                    }
                  }
                  onClick={Link.availableIf(
                    !isArticlesBusy
                    && (
                      switch (viewMode) {
                      | Author(_) => false
                      | Favorited(_) => true
                      }
                    ),
                    Link.Location(Link.profile(~username)),
                  )}>
                  "My Articles"->React.string
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    switch (viewMode) {
                    | Shape.Profile.Author(_) => "nav-link"
                    | Favorited(_) => "nav-link active"
                    }
                  }
                  onClick={Link.availableIf(
                    !isArticlesBusy
                    && (
                      switch (viewMode) {
                      | Author(_) => true
                      | Favorited(_) => false
                      }
                    ),
                    Link.Location(Link.favorited(~username)),
                  )}>
                  "Favorited Articles"->React.string
                </Link>
              </li>
              {if (articles |> AsyncResult.isBusy) {
                 <li className="nav-item"> <Spinner /> </li>;
               } else {
                 React.null;
               }}
            </ul>
          </div>
          {switch (articles) {
           | Init
           | Loading => React.null
           | Reloading(Error(_))
           | Complete(Error(_)) => "ERROR" |> React.string
           | Reloading(Ok(ok))
           | Complete(Ok(ok)) =>
             <>
               {ok.articles
                |> Array.map((article: Shape.Article.t) => {
                     let isFavoriteBusy =
                       toggleFavoriteBusy
                       |> Belt.Set.String.has(_, article.slug);

                     <div className="article-preview" key={article.slug}>
                       <div className="article-meta">
                         <Link
                           onClick={
                             Link.profile(~username=article.author.username)
                             |> Link.location
                           }>
                           {switch (article.author.image) {
                            | "" => <img />
                            | src => <img src />
                            }}
                         </Link>
                         <div className="info">
                           <Link
                             className="author"
                             onClick={
                               Link.profile(~username=article.author.username)
                               |> Link.location
                             }>
                             article.author.username->React.string
                           </Link>
                           <span className="date">
                             {article.createdAt->Utils.formatDate->React.string}
                           </span>
                         </div>
                         <Link.Button
                           className={
                             article.favorited
                               ? "btn btn-primary btn-sm pull-xs-right"
                               : "btn btn-outline-primary btn-sm pull-xs-right"
                           }
                           disabled=isFavoriteBusy
                           onClick={Link.customFn(() =>
                             if (!isFavoriteBusy) {
                               onToggleFavorite(
                                 ~action=
                                   article.favorited
                                     ? API.Action.Unfavorite(article.slug)
                                     : API.Action.Favorite(article.slug),
                               );
                             }
                           )}>
                           <i
                             className={
                               isFavoriteBusy ? "ion-load-a" : "ion-heart"
                             }
                             style={ReactDOMRe.Style.make(
                               ~marginRight="3px",
                               (),
                             )}
                           />
                           {article.favoritesCount->string_of_int->React.string}
                         </Link.Button>
                       </div>
                       <Link
                         className="preview-link"
                         onClick={
                           Link.article(~slug=article.slug) |> Link.location
                         }>
                         <h1> article.title->React.string </h1>
                         <p> article.description->React.string </p>
                         <span> "Read more..."->React.string </span>
                         {switch (article.tagList) {
                          | [||] => React.null
                          | tagList =>
                            <ul className="tag-list">
                              {tagList
                               |> Array.map(tag =>
                                    <li
                                      key=tag
                                      className="tag-default tag-pill tag-outline">
                                      tag->React.string
                                    </li>
                                  )
                               |> React.array}
                            </ul>
                          }}
                       </Link>
                     </div>;
                   })
                |> React.array}
               <Pagination
                 limit
                 offset
                 total={ok.articlesCount}
                 onClick={
                   articles |> AsyncResult.isBusy ? ignore : changeOffset
                 }
               />
             </>
           }}
        </div>
      </div>
    </div>
  </div>;
};
