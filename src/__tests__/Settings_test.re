open Jest;
open Expect;
open ReactTestingLibrary;

describe("Settings component", () => {
  test("renders without crashing", () => {
    let wrapper = render(<App />);

    ReasonReactRouter.push("#/settings");

    wrapper
    |> getByText(~matcher=`Str("Your Settings"))
    |> Webapi.Dom.Element.innerHTML
    |> expect
    |> toEqual("Your Settings");
  });

  ();
});
