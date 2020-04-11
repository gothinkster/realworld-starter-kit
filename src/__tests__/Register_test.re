open Js.Promise;
open Jest;
open Expect;
open BsJestFetchMock;
open ReactTestingLibrary;

describe("Register component", () => {
  beforeEach(() => {JestFetchMock.resetMocks()});

  testPromise("renders without crashing", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => {ReasonReactRouter.push("#/register")});

    DomTestingLibrary.waitFor(
      ~callback=
        () =>
          wrapper |> getByText(~matcher=`Str("Have an account?")) |> ignore,
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Have an account?"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Have an account?")
         |> resolve
       );
  });

  // TODO: delete following line when we have more than 1 test case
  ();
});