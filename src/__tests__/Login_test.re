open Jest;
open Expect;
open ReactTestingLibrary;

describe("Login component", () => {
  test("renders without crashing", () => {
    let wrapper = render(<App />);

    ReasonReactRouter.push("#/login");

    wrapper
    |> getByText(~matcher=`Str("Need an account?"))
    |> Webapi.Dom.Element.innerHTML
    |> expect
    |> toEqual("Need an account?");
  });

  ();
});
