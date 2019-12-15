open Jest;
open Expect;
open ReactTestingLibrary;

describe("Profile component", () => {
  test("renders without crashing", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/profile/someone"));

    wrapper
    |> getByText(~matcher=`Str("My Articles"))
    |> Webapi.Dom.Element.innerHTML
    |> expect
    |> toEqual("My Articles");
  });

  test("renders someone's favorited articles", () => {
    let wrapper = render(<App />);

    TestUtils.act(() =>
      ReasonReactRouter.push("#/profile/someone/favorites")
    );

    wrapper
    |> getByText(~matcher=`Str("Favorited Articles"))
    |> Webapi.Dom.Element.innerHTML
    |> expect
    |> toEqual("Favorited Articles");
  });
});
