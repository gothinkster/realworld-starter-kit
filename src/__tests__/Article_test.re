open Js.Promise;
open Jest;
open Expect;
open ReactTestingLibrary;

describe("Article component", () => {
  testPromise("renders without crashing", () => {
    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/article/article-title"));

    DomTestingLibrary.waitForElement(
      ~callback=
        () =>
          wrapper
          |> getByText(~matcher=`Str("How to build webapps that scale")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("How to build webapps that scale"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("How to build webapps that scale")
         |> resolve
       );
  });

  // TODO: delete following line when we have more than 1 test case
  let _ = ();
});
