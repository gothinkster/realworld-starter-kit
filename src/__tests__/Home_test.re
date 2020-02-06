open Js.Promise;
open Jest;
open Expect;
open JestDom;
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
         |> expect
         |> toBeInTheDocument
         |> resolve
       );
  });

  testPromise(
    {|"Global Feed" should be actived and "You Feed" tab should be invisible when user is anonymous|},
    () => {
      ApiMock.doMock(
        ~pipeline=ApiMock.succeed |> ApiMock.tags |> ApiMock.articles,
        (),
      );

      let wrapper = render(<App />);

      DomTestingLibrary.waitForElement(
        ~callback=
          () =>
            wrapper |> getByText(~matcher=`Str("How to train your dragon")),
        (),
      )
      |> then_(_ =>
           (
             wrapper
             |> TestUtils.queryByText(~matcher=`Str("Your Feed"))
             |> (==)(Js.null),
             wrapper
             |> getByText(~matcher=`Str("Global Feed"))
             |> Webapi.Dom.Element.innerHTML,
           )
           |> expect
           |> toEqual((true, "Global Feed"))
           |> resolve
         );
    },
  );

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
           |> expect
           |> toBeInTheDocument
           |> resolve
         );
    },
  );
});
