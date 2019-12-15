open Jest;
open Expect;
open ReactTestingLibrary;

describe("Editor component", () => {
  test("renders without crashing", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/editor"));

    wrapper
    |> getByText(~matcher=`Str("Publish Article"))
    |> Webapi.Dom.Element.innerHTML
    |> expect
    |> toEqual("Publish Article");
  });

  test("renders screen in editing mode", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/editor/article-title"));

    wrapper
    |> getByText(~matcher=`Str("Publish Article"))
    |> Webapi.Dom.Element.innerHTML
    |> expect
    |> toEqual("Publish Article");
  });
});
