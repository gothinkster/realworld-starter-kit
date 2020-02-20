module Option = Relude.Option;
module AsyncResult = Relude.AsyncResult;

[@react.component]
let make = (~viewMode: Shape.Profile.viewMode, ~user: option(Shape.User.t)) => {
  let username =
    switch (viewMode) {
    | Author(username, _limit, _offset) => username
    | Favorited(username, _limit, _offset) => username
    };
  let profile = Hook.useProfile(~username);
  let articles = Hook.useArticlesInProfile(~viewMode);
  let (follow, onFollowClick) = Hook.useFollowInProfile(~profile, ~user);
  let isArticlesBusy = articles |> AsyncResult.isBusy;

  <div className="profile-page">
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            {switch (profile) {
             | Init
             | Loading
             | Reloading(Error(_))
             | Complete(Error(_)) => <img className="user-img" />
             | Reloading(Ok(user))
             | Complete(Ok(user)) =>
               <img src={user.image} className="user-img" />
             }}
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
          <div className="article-preview">
            <div className="article-meta">
              <Link onClick={Link.profile(~username) |> Link.location}>
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </Link>
              <div className="info">
                <Link
                  className="author"
                  onClick={Link.profile(~username) |> Link.location}>
                  "Eric Simons"->React.string
                </Link>
                <span className="date"> "January 20th"->React.string </span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart" />
                "29"->React.string
              </button>
            </div>
            <Link
              className="preview-link"
              onClick={Link.article(~slug="") |> Link.location}>
              <h1> "How to build webapps that scale"->React.string </h1>
              <p> "This is the description for the post."->React.string </p>
              <span> "Read more..."->React.string </span>
            </Link>
          </div>
          <div className="article-preview">
            <div className="article-meta">
              <Link onClick={Link.profile(~username) |> Link.location}>
                <img src="http://i.imgur.com/N4VcUeJ.jpg" />
              </Link>
              <div className="info">
                <Link
                  className="author"
                  onClick={Link.profile(~username) |> Link.location}>
                  "Albert Pai"->React.string
                </Link>
                <span className="date"> "January 20th"->React.string </span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart" />
                "32"->React.string
              </button>
            </div>
            <Link
              className="preview-link"
              onClick={Link.article(~slug="") |> Link.location}>
              <h1>
                "The song you won't ever stop singing. No matter how hard you try."
                ->React.string
              </h1>
              <p> "This is the description for the post."->React.string </p>
              <span> "Read more..."->React.string </span>
              <ul className="tag-list">
                <li className="tag-default tag-pill tag-outline">
                  "Music"->React.string
                </li>
                <li className="tag-default tag-pill tag-outline">
                  "Song"->React.string
                </li>
              </ul>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>;
};
