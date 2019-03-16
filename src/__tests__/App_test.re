open Jest;
open Expect;
open Types;
open ReactTestingLibrary;

[@bs.get] external firstChild: Dom.element => Dom.node = "";
[@bs.get] external innerHTML: Dom.node => string = "";
[@bs.get] external textContent: Dom.element => string = "";

describe("App component", () => {
  test("renders without crashing", () => {
    let wrapper = render(<App />);
    let actual =
      wrapper
      |> getByText(~matcher=`Str("A place to share your knowledge."))
      |> textContent;
    actual |> expect |> toEqual("A place to share your knowledge.");
  });
  ignore();
});

describe("makeLinkClass", () => {
  test("append \"active\" if current and target is same ", () =>
    App.makeLinkClass(Home, Home) |> expect |> toBe("nav-link active")
  );
  test("append empty string if current and target is not same", () =>
    App.makeLinkClass(Home, Login) |> expect |> toBe("nav-link")
  );
});
