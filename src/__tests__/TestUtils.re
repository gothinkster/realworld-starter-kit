[@bs.module "@testing-library/react"]
external rawAct: (unit => Js.Undefined.t(Js.Promise.t('a))) => unit = "act";

let act = callback =>
  rawAct(() => {
    callback();
    // Fix: Warning: The callback passed to act(...) function mu st return undefined, or a Promise.
    Js.Undefined.empty;
  });

module ApiMock = {
  open BsJestFetchMock;

  let articles = {|{
  "articles": [
    {
      "title": "How to train your dragon",
      "slug": "how-to-train-your-dragon-5w7g2y",
      "body": "Very carefully.",
      "createdAt": "2020-02-02T00:01:12.697Z",
      "updatedAt": "2020-02-02T00:01:12.697Z",
      "tagList": ["training", "dragons"],
      "description": "Ever wonder how?",
      "author": {
        "username": "jihchi",
        "bio": null,
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "following": false
      },
      "favorited": false,
      "favoritesCount": 3
    }
  ],
  "articlesCount": 1
}|};

  let endsWithUrl = (url, body) =>
    JestFetchMock.Fn(
      req =>
        if (req |> Fetch.Request.url |> Js.String.endsWith(url)) {
          body |> Js.Promise.resolve;
        } else {
          "" |> Js.Promise.resolve;
        },
    );

  let listArticles = () =>
    JestFetchMock.mockResponse(
      ~response=endsWithUrl("/api/articles", articles),
      (),
    );

  let feedArticles = () =>
    JestFetchMock.mockResponse(
      ~response=endsWithUrl("/api/articles/feed", articles),
      (),
    );

  let tagsBody = {|{
  "tags": [
    "butt",
    "dragons",
    "training",
    "coffee",
    "sushi"
  ]
}|};

  let tags = () =>
    JestFetchMock.mockResponse(
      ~response=endsWithUrl("/api/tags", tagsBody),
      (),
    );

  let currentUserBody = {|{
  "user": {
    "id": 25902,
    "email": "achi@987.tw",
    "createdAt": "2018-04-09T15:16:52.642Z",
    "updatedAt": "2020-02-01T08:04:22.290Z",
    "username": "Jihchi Lee",
    "bio": null,
    "image": "",
    "token": "eyJ0eX.eyJpZCI.rLH25U9Z"
  }
}
|};

  let authorizedUser = () =>
    JestFetchMock.mockResponse(
      ~response=endsWithUrl("/api/user", currentUserBody),
      (),
    );

  let anonymousUser = () =>
    JestFetchMock.mockResponse(
      ~response=endsWithUrl("/api/user", ""),
      ~init=
        JestFetchMock.init(~status=401, ~statusText="401 Unauthorized", ()),
      (),
    );
};

// this a work-around such that Jest won't emit warning
Jest.test("noop", () =>
  Jest.pass
);
