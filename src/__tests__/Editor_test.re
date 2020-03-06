open Js.Promise;
open Jest;
open Expect;
open ReactTestingLibrary;
open TestUtils;

describe("Editor component", () => {
  testPromise("renders without crashing", () => {
    ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.user, ());

    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/editor"));

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("Publish Article")),
      (),
    )
    |> then_(_ => {
         wrapper
         |> getByText(~matcher=`Str("Publish Article"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Publish Article")
         |> resolve
       });
  });

  testPromise("renders screen in editing mode", () => {
    ApiMock.doMock(
      ~pipeline=ApiMock.succeed |> ApiMock.article |> ApiMock.user,
      (),
    );

    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/editor/slug"));

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
