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

  beforeEach(() => {
    origToken := Utils.getCookie("token");
    ignore();
  });
  afterEach(() => {
    switch (origToken^) {
    | Some(token) => Utils.setCookie("token", token)
    | None => ignore()
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
