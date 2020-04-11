open Js.Promise;
open Jest;
open Expect;
open BsJestFetchMock;
open ReactTestingLibrary;
open TestUtils;

describe("Settings component", () => {
  beforeEach(() => {JestFetchMock.resetMocks()});

  testPromise("renders without crashing", () => {
    ApiMock.doMock(
      ~pipeline=
        ApiMock.succeed |> ApiMock.user |> ApiMock.articles |> ApiMock.tags,
      (),
    );
    let wrapper = render(<App />);

    TestUtils.act(() => {ReasonReactRouter.push("#/settings")});

    DomTestingLibrary.waitFor(
      ~callback=
        () => wrapper |> getByText(~matcher=`Str("Your Settings")) |> ignore,
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Your Settings"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Your Settings")
         |> resolve
       );
  });

  // TODO: delete following line when we have more than 1 test case
  let _ = ();
  ();
});