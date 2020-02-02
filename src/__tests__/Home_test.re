open Js.Promise;
open Jest;
open Expect;
open ReactTestingLibrary;

describe("Home component", () => {
  testPromise("renders without crashing", () => {
    let wrapper = render(<App />);

    DomTestingLibrary.waitForElement(
      ~callback=
        () =>
          wrapper
          |> getByText(~matcher=`Str("A place to share your knowledge.")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("A place to share your knowledge."))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("A place to share your knowledge.")
         |> resolve
       );
  });

  // TODO: delete following line when we have more than 1 test case
  let _ = ();
});
