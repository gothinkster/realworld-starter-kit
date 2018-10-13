open Jest;
open Expect;
open Types;
open ReactTestingLibrary;

describe("App component", () => {
  testAsync("renders without crashing", finish => {
    let wrapper = render(<App />);
    Js.Global.setTimeout(
      () => wrapper |> expect |> toMatchSnapshot |> finish,
      0,
    )
    |> ignore;
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
