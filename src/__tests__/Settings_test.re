open Js.Promise;
open Jest;
open Expect;
open ReactTestingLibrary;

describe("Settings component", () => {
  testPromise("renders without crashing", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => {ReasonReactRouter.push("#/settings")});

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("Your Settings")),
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
