open Relude.Globals

module Function = Relude.Function

module ApiMock = {
  open BsJestFetchMock

  @bs.scope("fetch") @bs.val external fetch: {"calls": array<array<string>>} = "mock"

  let unathorized401 = JestFetchMock.init(~status=401, ~statusText="401 Unauthorized", ())

  let succeed: Result.t<string, string> => Result.t<string, string> = Result.flatMap(Result.pure)

  let pipe: (
    string => Result.t<string, string>,
    Result.t<string, string> => Result.t<string, string>,
    Result.t<string, string>,
  ) => Result.t<string, string> = fn => Function.map(Result.flatMap(fn))

  let tap: (
    Result.t<string, string> => Result.t<string, string>,
    Result.t<string, string>,
  ) => Result.t<string, string> = pipe(pathname => {
    Js.log2("pathname: %o", pathname)
    pathname |> Result.ok
  })

  let profile: (
    Result.t<string, string> => Result.t<string, string>,
    Result.t<string, string>,
  ) => Result.t<string, string> = pipe(pathname =>
    if pathname == "/api/profiles/jihchi" {
      SampleData.profile() |> Result.error
    } else {
      pathname |> Result.ok
    }
  )

  let comments: (
    Result.t<string, string> => Result.t<string, string>,
    Result.t<string, string>,
  ) => Result.t<string, string> = pipe(pathname =>
    if pathname == "/api/articles/slug/comments" {
      SampleData.comments() |> Result.error
    } else {
      pathname |> Result.ok
    }
  )

  let articles: (
    ~articlesCount: int=?,
    Result.t<string, string> => Result.t<string, string>,
    Result.t<string, string>,
  ) => Result.t<string, string> = (~articlesCount=1, bToC, a) => pipe(pathname =>
      if pathname == "/api/articles" {
        SampleData.articles(~articlesCount, ()) |> Result.error
      } else {
        pathname |> Result.ok
      }
    , bToC, a)

  let feeds: (
    ~articlesCount: int=?,
    Result.t<string, string> => Result.t<string, string>,
    Result.t<string, string>,
  ) => Result.t<string, string> = (~articlesCount=1, bToC, a) => pipe(pathname =>
      if pathname == "/api/articles/feed" {
        SampleData.feeds(~articlesCount, ()) |> Result.error
      } else {
        pathname |> Result.ok
      }
    , bToC, a)

  let tags: (
    Result.t<string, string> => Result.t<string, string>,
    Result.t<string, string>,
  ) => Result.t<string, string> = pipe(pathname =>
    if pathname == "/api/tags" {
      SampleData.tags() |> Result.error
    } else {
      pathname |> Result.ok
    }
  )

  let user: (
    Result.t<string, string> => Result.t<string, string>,
    Result.t<string, string>,
  ) => Result.t<string, string> = pipe(pathname =>
    if pathname == "/api/user" {
      SampleData.user() |> Result.error
    } else {
      pathname |> Result.ok
    }
  )

  let article: (
    Result.t<string, string> => Result.t<string, string>,
    Result.t<string, string>,
  ) => Result.t<string, string> = pipe(pathname =>
    if pathname == "/api/articles/slug" {
      SampleData.article() |> Result.error
    } else {
      pathname |> Result.ok
    }
  )

  let parseUrl: Fetch.Request.t => string = req =>
    req |> Fetch.Request.url |> Webapi.Url.make |> Webapi.Url.pathname

  let doMock = (~init=?, ~pipeline, ()) =>
    JestFetchMock.mockResponse(
      #FnStr(
        req => {
          let url: Result.t<string, string> = req |> parseUrl |> Result.pure
          let result: Result.t<string, string> = url |> pipeline

          result |> Result.flip |> Result.getOrElse("") |> Js.Promise.resolve
        },
      ),
      Js.Undefined.fromOption(init),
    )
}

// this a work-around such that Jest won't emit warning
Jest.Skip.test(__FILE__ ++ " work-around", () => Jest.pass)
