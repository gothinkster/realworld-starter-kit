open Js.Promise;
open Jest;
open Expect;
open BsJestFetchMock;
open ReactTestingLibrary;

describe("Login component", () => {
  beforeEach(() => {JestFetchMock.resetMocks()});

  testPromise("renders without crashing", () => {
    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("#/login"));

    DomTestingLibrary.waitFor(
      ~callback=
        () =>
          wrapper |> getByText(~matcher=`Str("Need an account?")) |> ignore,
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Need an account?"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Need an account?")
         |> resolve
       );
  });

  // TODO: delete following line when we have more than 1 test case
  ();
});
