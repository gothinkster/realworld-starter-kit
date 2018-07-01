open Jest;
open Expect;
open Belt.Result;
open Js.Promise;

describe("optToQueryString", () => {
  test("None returns empty string", () => {
    let actual = API.optToQueryString("", None);
    actual |> expect |> toBe("");
  });
  test("None returns empty string and ignore prefix", () => {
    let actual = API.optToQueryString("PREFIX-", None);
    actual |> expect |> toBe("");
  });
  test("Some returns string with custom prefix", () => {
    let actual = API.optToQueryString("PREFIX-", Some("yeah"));
    actual |> expect |> toBe("PREFIX-yeah");
  });
  test("Some returns string with empty prefix", () => {
    let actual = API.optToQueryString("", Some("yeah"));
    actual |> expect |> toBe("yeah");
  });
});

describe("getResultIfOk", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("returns Ok if Fetch response ok", () => {
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );

    API.host
    |. Fetch.fetchWithInit(API.makeFetchInit())
    |> then_(API.getResultIfOk)
    |> then_(actual => {
         let expected = "ok" |. Json.Encode.string |. Ok;
         actual |> expect |> toEqual(expected) |> resolve;
       });
  });
  testPromise(
    "returns Error if Fetch response is not ok and status is 400", () => {
    JestFetchMock.mockResponse(
      ~body={js|"not ok 400"|js},
      ~status=400,
      ~statusText="400",
      (),
    );

    API.host
    |. Fetch.fetchWithInit(API.makeFetchInit())
    |> then_(API.getResultIfOk)
    |> then_(actual => {
         let expected = "not ok 400" |. Json.Encode.string |. Error;
         actual |> expect |> toEqual(expected) |> resolve;
       });
  });
  testPromise(
    "returns Error if Fetch response is not ok and status is 500", () => {
    JestFetchMock.mockResponse(
      ~body={js|"not ok 500"|js},
      ~status=500,
      ~statusText="500",
      (),
    );

    API.host
    |. Fetch.fetchWithInit(API.makeFetchInit())
    |> then_(API.getResultIfOk)
    |> then_(actual => {
         let expected = "not ok 500" |. Json.Encode.string |. Error;
         actual |> expect |> toEqual(expected) |> resolve;
       });
  });
});

describe("makeFetchInit", () => {
  let origToken = ref(None);

  beforeAll(() => {
    origToken := Utils.getCookie("token");
    ignore();
  });

  afterEach(() => {
    switch (origToken^) {
    | Some(token) => Utils.setCookie("token", token)
    | None => Utils.setCookie("token", "")
    };
    ignore();
  });

  test("no argument", () => {
    let actual = API.makeFetchInit();
    actual |> expect |> toMatchSnapshot;
  });
  test("custom method with POST", () => {
    let actual = API.makeFetchInit(~method_=Post, ());
    actual |> expect |> toMatchSnapshot;
  });
  test("should not include credential", () => {
    let actual = API.makeFetchInit(~includeCookie=false, ());
    actual |> expect |> toMatchSnapshot;
  });
  test("add \"Authorization: Token \" to header", () => {
    Utils.setCookie("token", "@@unit test@@");
    let actual = API.makeFetchInit(~authorization=true, ());
    actual |> expect |> toMatchSnapshot;
  });
  test("add \"Content-Type: application/json; charset=utf-8\" to header", () => {
    let actual = API.makeFetchInit(~jsonContentType=true, ());
    actual |> expect |> toMatchSnapshot;
  });
});

describe("listArticlesFeed", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.listArticlesFeed()
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles/feed?limit=20&offset=0",
            )
         |> resolve
       )
  );
  testPromise("limit 5", () =>
    API.listArticlesFeed(~limit=5, ())
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles/feed?limit=5&offset=0",
            )
         |> resolve
       )
  );
  testPromise("offset 10", () =>
    API.listArticlesFeed(~offset=10, ())
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles/feed?limit=20&offset=10",
            )
         |> resolve
       )
  );
});

describe("listArticles", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.listArticles()
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles?limit=20&offset=0",
            )
         |> resolve
       )
  );
  testPromise("all combined", () =>
    API.listArticles(
      ~tag="@tag@",
      ~author="@author@",
      ~favorited="@favorited@",
      ~limit=5,
      ~offset=10,
      (),
    )
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles?limit=5&offset=10&tag=@tag@&author=@author@&favorited=@favorited@",
            )
         |> resolve
       )
  );
  testPromise("tag `@tag@`", () =>
    API.listArticles(~tag="@tag@", ())
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles?limit=20&offset=0&tag=@tag@",
            )
         |> resolve
       )
  );
  testPromise("author `@author@`", () =>
    API.listArticles(~author="@author@", ())
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles?limit=20&offset=0&author=@author@",
            )
         |> resolve
       )
  );
  testPromise("favorited `@favorited@`", () =>
    API.listArticles(~favorited="@favorited@", ())
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles?limit=20&offset=0&favorited=@favorited@",
            )
         |> resolve
       )
  );
  testPromise("limit 5", () =>
    API.listArticles(~limit=5, ())
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles?limit=5&offset=0",
            )
         |> resolve
       )
  );
  testPromise("offset 10", () =>
    API.listArticles(~offset=10, ())
    |> then_(_ =>
         JestFetchMock.Mock.calls[0][0]
         |> expect
         |> toEqual(
              "https://conduit.productionready.io/api/articles?limit=20&offset=10",
            )
         |> resolve
       )
  );
});
