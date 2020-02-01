type whose =
  | Author(string)
  | FavoritedBy(string);

type t =
  | Home
  | Login
  | Register
  | CreateArticle
  | EditArticle(string)
  | Article(string)
  | Profile(whose)
  | Settings;

type location';

external toString: location' => string = "%identity";

let home: location';
let settings: location';
let register: location';
let login: location';
let createArticle: location';
let editArticle: (~slug: string) => location';
let article: (~slug: string) => location';
let viewProfile: (~username: string) => location';
let viewFavorites : (~username: string) => location';

let useRoute: unit => t;
