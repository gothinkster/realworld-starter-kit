module Error = {
  type t;
  [@bs.new] external makeEx: Js.Undefined.t(string) => t = "Error";
  let make = (~message=?, ()) => makeEx(message |> Js.Undefined.fromOption);
};

module Mock = {
  [@bs.val] external calls: array(array('a)) = "fetch.mock.calls";
  [@bs.val] external callsLength: int = "fetch.mock.calls.length";
};

type initOptions = {
  .
  "status": int,
  "statusText": string,
};

[@bs.obj]
external makeInitOptions:
  (~status: int=?, ~statusText: string=?, unit) => initOptions =
  "";
[@bs.val] external resetMocks: unit => unit = "fetch.resetMocks";
[@bs.val] external mockReject: Error.t => unit = "fetch.mockReject";
[@bs.val]
external mockResponseEx: (string, initOptions) => unit = "fetch.mockResponse";
let mockResponse = (~body, ~status=?, ~statusText=?, ()) =>
  mockResponseEx(body, makeInitOptions(~status?, ~statusText?, ()));
