open Js.Promise;
open Jest;
open Expect;
open ReactTestingLibrary;
open TestUtils;

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

  testPromise(
    {|"You Feed" tab should be actived when user is logged in and it is first time to visit|},
    () => {
      ApiMock.doMock(
        ~pipeline=
          ApiMock.succeed |> ApiMock.user |> ApiMock.tags |> ApiMock.articles,
        (),
      );

      let wrapper = render(<App />);

      DomTestingLibrary.waitForElement(
        ~callback=() => wrapper |> getByText(~matcher=`Str("Your Feed")),
        (),
      )
      |> then_(_ =>
           wrapper
           |> getByText(~matcher=`Str("Your Feed"))
           |> Webapi.Dom.Element.innerHTML
           |> expect
           |> toEqual("Your Feed")
           |> resolve
         );
    },
  );
});
