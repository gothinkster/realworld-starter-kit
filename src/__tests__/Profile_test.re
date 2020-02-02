open Js.Promise;
open Jest;
open Expect;
open ReactTestingLibrary;

describe("Profile component", () => {
  testPromise("renders without crashing", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/profile/someone"));

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("My Articles")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("My Articles"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("My Articles")
         |> resolve
       );
  });

  testPromise("renders someone's favorited articles", () => {
    let wrapper = render(<App />);

    TestUtils.act(() =>
      ReasonReactRouter.push("#/profile/someone/favorites")
    );

    DomTestingLibrary.waitForElement(
      ~callback=
        () => wrapper |> getByText(~matcher=`Str("Favorited Articles")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Favorited Articles"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Favorited Articles")
         |> resolve
       );
  });
});
