open Relude.Globals;

module Function = Relude.Function;

[@bs.module "@testing-library/react"]
external rawAct: (unit => Js.Undefined.t(Js.Promise.t('a))) => unit = "act";

let act = callback =>
  rawAct(() => {
    callback();
    // Fix: Warning: The callback passed to act(...) function must return undefined, or a Promise.
    Js.Undefined.empty;
  });

[@bs.send.pipe: ReactTestingLibrary.renderResult]
external queryByTestId: string => Js.Null.t(Dom.element) = "queryByTestId";

[@bs.module "@testing-library/dom"]
external queryByText:
  (
    Dom.element,
    ~matcher: [@bs.unwrap] [
                | `Str(string)
                | `RegExp(Js.Re.t)
                | `Func((string, Dom.element) => bool)
              ],
    ~options: Js.undefined(DomTestingLibrary.Query.options)
  ) =>
  Js.Null.t(Dom.element) =
  "queryByText";

let queryByText = (~matcher, ~options=?, result) =>
  queryByText(
    ~matcher,
    ~options=Js.Undefined.fromOption(options),
    result |> ReactTestingLibrary.container,
  );

[@bs.module "@testing-library/dom"]
external getAllByText:
  (
    Dom.element,
    ~matcher: [@bs.unwrap] [
                | `Str(string)
                | `RegExp(Js.Re.t)
                | `Func((string, Dom.element) => bool)
              ],
    ~options: Js.undefined(DomTestingLibrary.Query.options)
  ) =>
  array(Dom.element) =
  "getAllByText";

let getAllByText = (~matcher, ~options=?, result) =>
  getAllByText(
    ~matcher,
    ~options=Js.Undefined.fromOption(options),
    result |> ReactTestingLibrary.container,
  );

module ApiMock = {
  open BsJestFetchMock;

  [@bs.scope "fetch"] [@bs.val]
  external fetch: {. "calls": array(array(string))} = "mock";

  module SampleData = {
    [@bs.module "../sampleData/profile.js"]
    external profile: unit => string = "default";

    [@bs.module "../sampleData/comments.js"]
    external comments: unit => string = "default";

    [@bs.module "../sampleData/articles.js"]
    external rawArticles: int => string = "default";

    let articles = (~articlesCount=1, ()) => rawArticles(articlesCount);
    let feeds = (~articlesCount=1, ()) => rawArticles(articlesCount);

    [@bs.module "../sampleData/tags.js"]
    external tags: unit => string = "default";

    [@bs.module "../sampleData/user.js"]
    external user: unit => string = "default";

    [@bs.module "../sampleData/article.js"]
    external article: unit => string = "default";
  };

  let unathorized401 =
    JestFetchMock.init(~status=401, ~statusText="401 Unauthorized", ());

  let succeed: Result.t(string, string) => Result.t(string, string) =
    Result.flatMap(Result.pure);

  let pipe:
    (
      string => Result.t(string, string),
      Result.t(string, string) => Result.t(string, string),
      Result.t(string, string)
    ) =>
    Result.t(string, string) =
    fn => Function.map(Result.flatMap(fn));

  let tap:
    (
      Result.t(string, string) => Result.t(string, string),
      Result.t(string, string)
    ) =>
    Result.t(string, string) =
    pipe(pathname => {
      Js.log2("pathname: %o", pathname);
      pathname |> Result.ok;
    });

  let profile:
    (
      Result.t(string, string) => Result.t(string, string),
      Result.t(string, string)
    ) =>
    Result.t(string, string) =
    pipe(pathname =>
      if (pathname == "/api/profiles/jihchi") {
        SampleData.profile() |> Result.error;
      } else {
        pathname |> Result.ok;
      }
    );

  let comments:
    (
      Result.t(string, string) => Result.t(string, string),
      Result.t(string, string)
    ) =>
    Result.t(string, string) =
    pipe(pathname =>
      if (pathname == "/api/articles/slug/comments") {
        SampleData.comments() |> Result.error;
      } else {
        pathname |> Result.ok;
      }
    );

  let articles:
    (
      ~articlesCount: int=?,
      Result.t(string, string) => Result.t(string, string),
      Result.t(string, string)
    ) =>
    Result.t(string, string) =
    (~articlesCount=1, bToC, a) =>
      pipe(
        pathname =>
          if (pathname == "/api/articles") {
            SampleData.articles(~articlesCount, ()) |> Result.error;
          } else {
            pathname |> Result.ok;
          },
        bToC,
        a,
      );

  let feeds:
    (
      ~articlesCount: int=?,
      Result.t(string, string) => Result.t(string, string),
      Result.t(string, string)
    ) =>
    Result.t(string, string) =
    (~articlesCount=1, bToC, a) =>
      pipe(
        pathname =>
          if (pathname == "/api/articles/feed") {
            SampleData.feeds(~articlesCount, ()) |> Result.error;
          } else {
            pathname |> Result.ok;
          },
        bToC,
        a,
      );

  let tags:
    (
      Result.t(string, string) => Result.t(string, string),
      Result.t(string, string)
    ) =>
    Result.t(string, string) =
    pipe(pathname =>
      if (pathname == "/api/tags") {
        SampleData.tags() |> Result.error;
      } else {
        pathname |> Result.ok;
      }
    );

  let user:
    (
      Result.t(string, string) => Result.t(string, string),
      Result.t(string, string)
    ) =>
    Result.t(string, string) =
    pipe(pathname =>
      if (pathname == "/api/user") {
        SampleData.user() |> Result.error;
      } else {
        pathname |> Result.ok;
      }
    );

  let article:
    (
      Result.t(string, string) => Result.t(string, string),
      Result.t(string, string)
    ) =>
    Result.t(string, string) =
    pipe(pathname =>
      if (pathname == "/api/articles/slug") {
        SampleData.article() |> Result.error;
      } else {
        pathname |> Result.ok;
      }
    );

  let parseUrl: Fetch.Request.t => string =
    req => req |> Fetch.Request.url |> Webapi.Url.make |> Webapi.Url.pathname;

  let doMock = (~init=?, ~pipeline, ()) =>
    JestFetchMock.mockResponse(
      `FnStr(
        req => {
          let url: Result.t(string, string) = req |> parseUrl |> Result.pure;
          let result: Result.t(string, string) = url |> pipeline;

          result |> Result.flip |> Result.getOrElse("") |> Js.Promise.resolve;
        },
      ),
      Js.Undefined.fromOption(init),
    );
};

// this a work-around such that Jest won't emit warning
Jest.Skip.test("TestUtils work-around", () =>
  Jest.pass
);
