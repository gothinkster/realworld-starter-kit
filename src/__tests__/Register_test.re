open Jest;
open Expect;
open ReactTestingLibrary;

describe("Register component", () => {
  test("renders without crashing", () => {
    let wrapper = render(<App />);

    ReasonReactRouter.push("#/register");

    wrapper
    |> getByText(~matcher=`Str("Have an account?"))
    |> Webapi.Dom.Element.innerHTML
    |> expect
    |> toEqual("Have an account?");
  });

  ();
});
