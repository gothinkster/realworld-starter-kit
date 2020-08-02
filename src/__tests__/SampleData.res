let profile: unit => string = () =>
  `{
  "profile": {
    "username": "jihchi",
    "bio": "I love ReasonML",
    "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
    "following": true
  }
}`

let comments: unit => string = () =>
  `{
  "comments": [
    {
      "id": 123,
      "createdAt": "2020-02-16T04:18:57.852Z",
      "updatedAt": "2020-02-16T04:18:57.852Z",
      "body": "this is a good comment",
      "author": {
        "username": "Jihchi Lee",
        "bio": "yoyoyoyo",
        "image": "",
        "following": false
      }
    },
    {
      "id": 456,
      "createdAt": "2018-12-28T07:23:23.888Z",
      "updatedAt": "2018-12-28T07:23:23.888Z",
      "body": "you never know",
      "author": {
        "username": "johnnyjacob",
        "bio": null,
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "following": false
      }
    }
  ]
}`

let articles: (~articlesCount: int=?, unit) => string = (~articlesCount=1, ()) =>
    `{
  "articles": [
    {
      "title": "How to train your dragon",
      "slug": "how-to-train-your-dragon-5w7g2y",
      "body": "Very carefully.",
      "createdAt": "2020-02-02T00:01:12.697Z",
      "updatedAt": "2020-02-02T00:01:12.697Z",
      "tagList": [
        "training",
        "dragons"
      ],
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
  "articlesCount": ${string_of_int(articlesCount)} 
}`

let feeds = articles

let tags: unit => string = () =>
  `{
  "tags": [
    "butt",
    "dragons",
    "training",
    "coffee",
    "sushi"
  ]
}`

let user: unit => string = () =>
  `{
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
}`

let article: unit => string = () =>
  `{
  "article": {
    "title": "How to train your dragon",
    "slug": "how-to-train-your-dragon-sbr0z2",
    "body": "Very carefully.",
    "createdAt": "2018-06-03T15:44:01.786Z",
    "updatedAt": "2018-06-03T15:44:01.786Z",
    "tagList": [
      "training",
      "dragons"
    ],
    "description": "Ever wonder how?",
    "author": {
      "username": "johnnyjacob",
      "bio": null,
      "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
      "following": false
    },
    "favorited": false,
    "favoritesCount": 12
  }
}`

// this a work-around such that Jest won't emit warning
Jest.Skip.test(__FILE__ ++ " work-around", () => Jest.pass)
