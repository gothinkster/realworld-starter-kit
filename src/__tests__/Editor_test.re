open Js.Promise;
open Jest;
open Expect;
open ReactTestingLibrary;

describe("Editor component", () => {
  testPromise("renders without crashing", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/editor"));

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("Publish Article")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Publish Article"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Publish Article")
         |> resolve
       );
  });

  testPromise("renders screen in editing mode", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/editor/article-title"));

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("Publish Article")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Publish Article"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Publish Article")
         |> resolve
       );
  });
});
