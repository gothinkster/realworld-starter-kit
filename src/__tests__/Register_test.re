open Js.Promise;
open Jest;
open Expect;
open ReactTestingLibrary;

describe("Register component", () => {
  testPromise("renders without crashing", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => {ReasonReactRouter.push("#/register")});

    DomTestingLibrary.waitForElement(
      ~callback=
        () => wrapper |> getByText(~matcher=`Str("Have an account?")),
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
