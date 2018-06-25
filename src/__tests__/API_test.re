open Jest;

open Expect;

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
  open Js.Promise;

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
         let expected = "ok" |. Json.Encode.string |. Belt.Result.Ok;
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
         let expected =
           "not ok 400" |. Json.Encode.string |. Belt.Result.Error;
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
         let expected =
           "not ok 500" |. Json.Encode.string |. Belt.Result.Error;
         actual |> expect |> toEqual(expected) |> resolve;
       });
  });
});
