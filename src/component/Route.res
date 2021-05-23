type t =
  | Home
  | Login
  | Register
  | CreateArticle
  | EditArticle(string)
  | Article(string)
  | Profile(string)
  | Favorited(string)
  | Settings

let useRoute: unit => t = () => {
  let url = RescriptReactRouter.useUrl()
  let hash = url.hash->Js.String2.split("/")

  switch hash {
  | ["", "settings"] => Settings
  | ["", "login"] => Login
  | ["", "register"] => Register
  | ["", "editor"] => CreateArticle
  | ["", "editor", slug] => EditArticle(slug)
  | ["", "article", slug] => Article(slug)
  | ["", "profile", username] => Profile(username)
  | ["", "profile", username, "favorites"] => Favorited(username)
  | _ => Home
  }
}
