
REAL WORLD BACKEND
==================

Real World demo is a "Conduit" like application. Conduit is a social blogging site (i.e. a
Medium.com clone). It uses a custom API for all requests, including authentication. You can view a
live demo over at https://demo.realworld.io

General functionality:

* Authenticate users via JWT (login/sign-up pages + logout button on settings page)
* CRU* users (sign up & settings page - no deleting required)
* CRUD Articles
* CR*D Comments on articles (no updating required)
* GET and display paginated lists of articles
* Favorite articles
* Follow other users

## Architecture

Code files, not classes like Java (take advantage of Kotlin language)

`routes` are controllers, called that way because another kind of controllers (ie: commands for CLI)
could exist (in this case a package called `commands` would be created).

Messages (request/responses) common to different routers are held in `Routes.kt`.

Three layers:

* Routes: HTTP layer (controllers) and messages (requests/responses)
  1. Gets data and parameters
  2. Authorize
  3. Authenticate
  2. Validate data and state
  3. Convert to services model
  4. Uses services for validation and execution
  5. Take resulting models and convert them to output messages
* Services: application logic and data (independent of the others)
  - Called by routes
  - Calls stores (the dependency will be by interfaces)
* Stores: storage port (with a MongoDB adapter)

Rules:
- "All you know binds you" the less each component knows about others, the better.
- Each layer is in a package
- A layer package can have subpackages
- Services can not import anything outside services (and as an exception logging)
- Other packages can only import from services

## Testing

Smoke tests in one run (all tests specified by Postman and some more).

## RealWorld API Spec

* CORS should be working ok and content type must be json/utf8: `application/json;charset=utf8`
* Authenticated endpoints must have the authentication header: `Authorization: Token jwt.token.here`

## JWT

JWT token generation/parsing requires a RSA key pair. To generate a keypair keystore execute:

```bash
keytool \
  -genkeypair \
  -keystore keystore.p12 \
  -storetype pkcs12 \
  -storepass storepass \
  -keyalg RSA \
  -validity 999 \
  -alias realWorld \
  -dname "CN=Real World, OU=Development, O=Hexagon, L=Madrid, S=Madrid, C=ES"
```

## Build

From now on assume `alias gw='./gradlew'`.

* Build: `gw installDist`
* Rebuild: `gw clean installDist`
* Run: `gw run`
* Watch: `gw --no-daemon --continuous runService`
* Test: `gw test`

## TODO

* Add more BDD tests
* Use error handler in controller instead try/catch block
* Create native executable using GraalVM
* Logs repeated (in exceptions). Check settings additivity
* `service_test.yaml` not honored (not picking a random port)
* Add requests' bodies validation returning as many errors as wrong fields
* Document code (Dokka)

## API

### Users (for authentication)

```JSON
{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }
}
```

### Profile

```JSON
{
  "profile": {
    "username": "jake",
    "bio": "I work at statefarm",
    "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
    "following": false
  }
}
```

### Single Article

```JSON
{
  "article": {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

### Multiple Articles

```JSON
{
  "articles":[{
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }, {
    "slug": "how-to-train-your-dragon-2",
    "title": "How to train your dragon 2",
    "description": "So toothless",
    "body": "It a dragon",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }],
  "articlesCount": 2
}
```

### Single Comment

```JSON
{
  "comment": {
    "id": 1,
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:22:56.637Z",
    "body": "It takes a Jacobian",
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

### Multiple Comments

```JSON
{
  "comments": [{
    "id": 1,
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:22:56.637Z",
    "body": "It takes a Jacobian",
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }]
}
```

### List of Tags

```JSON
{
  "tags": [
    "reactjs",
    "angularjs"
  ]
}
```

### Errors and Status Codes

If a request fails any validations, expect a 422 and errors in the following format:

```JSON
{
  "errors":{
    "body": [
      "can't be empty"
    ]
  }
}
```

#### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request

## Endpoints:

### Get Profile

`GET /api/profiles/:username`

Authentication optional, returns a [Profile](#profile)

### Follow user

`POST /api/profiles/:username/follow`

Authentication required, returns a [Profile](#profile)

No additional parameters required

### Unfollow user

`DELETE /api/profiles/:username/follow`

Authentication required, returns a [Profile](#profile)

No additional parameters required

### Create Article

`POST /api/articles`

Example request body:

```JSON
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
```

Authentication required, will return an [Article](#single-article)

Required fields: `title`, `description`, `body`

Optional fields: `tagList` as an array of Strings

### Update Article

`PUT /api/articles/:slug`

Example request body:

```JSON
{
  "article": {
    "title": "Did you train your dragon?"
  }
}
```

Authentication required, returns the updated [Article](#single-article)

Optional fields: `title`, `description`, `body`

The `slug` also gets updated when the `title` is changed

### Delete Article

`DELETE /api/articles/:slug`

Authentication required

### Favorite Article

`POST /api/articles/:slug/favorite`

Authentication required, returns the [Article](#single-article)

No additional parameters required

### Unfavorite Article

`DELETE /api/articles/:slug/favorite`

Authentication required, returns the [Article](#single-article)

No additional parameters required

### List Articles

`GET /api/articles`

Returns most recent articles globally by default, provide `tag`, `author` or `favorited` query parameter to filter results

Query Parameters:

Filter by tag:

`?tag=AngularJS`

Filter by author:

`?author=jake`

Favorited by user:

`?favorited=jake`

Limit number of articles (default is 20):

`?limit=20`

Offset/skip number of articles (default is 0):

`?offset=0`

Authentication optional, will return [multiple articles](#multiple-articles), ordered by most recent first

### Feed Articles

`GET /api/articles/feed`

Can also take `limit` and `offset` query parameters like [List Articles](#list-articles)

Authentication required, will return [multiple articles](#multiple-articles) created by followed users, ordered by most recent first.

### Get Article

`GET /api/articles/:slug`

No authentication required, will return [single article](#single-article)

### Add Comments to an Article

`POST /api/articles/:slug/comments`

Example request body:

```JSON
{
  "comment": {
    "body": "His name was my name too."
  }
}
```

Authentication required, returns the created [Comment](#single-comment)

Required field: `body`

### Get Comments from an Article

`GET /api/articles/:slug/comments`

Authentication optional, returns [multiple comments](#multiple-comments)

### Delete Comment

`DELETE /api/articles/:slug/comments/:id`

Authentication required

### Get Tags

`GET /api/tags`

No authentication required, returns a [List of Tags](#list-of-tags)
