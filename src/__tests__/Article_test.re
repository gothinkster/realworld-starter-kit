open Jest;
open Expect;
open ReactTestingLibrary;

describe("Article component", () => {
  test("renders without crashing", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/article/article-title"));

    wrapper
    |> getByText(~matcher=`Str("How to build webapps that scale"))
    |> Webapi.Dom.Element.innerHTML
    |> expect
    |> toEqual("How to build webapps that scale");
  });

  ();
});
