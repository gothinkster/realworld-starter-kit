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

type t';

external toString: t' => string = "%identity";

let home: t';
let settings: t';
let register: t';
let login: t';
let createArticle: t';
let editArticle: (~slug: string) => t';
let article: (~slug: string) => t';
let viewProfile: (~username: string) => t';
let viewFavorites : (~username: string) => t';

let useRoute: unit => t;
