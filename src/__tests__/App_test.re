open Jest;
open Expect;
open Types;

describe("App component", () => {
  ignore();
  test("renders without crashing", () => {
    let wrapper = Enzyme.mount(<App />);
    wrapper |> expect |> ExpectJs.toMatchSnapshot;
  });
});

describe("makeLinkClass", () => {
  test("append \"active\" if current and target is same ", () => {
    let actual = App.makeLinkClass(Home, Home);
    actual |> expect |> toBe("nav-link active");
  });
  test("append empty string if current and target is not same", () => {
    let actual = App.makeLinkClass(Home, Login);
    actual |> expect |> toBe("nav-link");
  });
});
