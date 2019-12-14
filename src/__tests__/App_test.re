open Jest;
open Expect;
open ReactTestingLibrary;

describe("App component", () => {
  test("renders without crashing", () => {
    let wrapper = render(<App />);

    wrapper
    |> getByText(~matcher=`Str("A place to share your knowledge."))
    |> Webapi.Dom.Element.innerHTML
    |> expect
    |> toEqual("A place to share your knowledge.");
  });

  ();
});
