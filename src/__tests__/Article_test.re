open Js.Promise;
open Jest;
open Expect;
open JestDom;
open BsJestFetchMock;
open ReactTestingLibrary;
open TestUtils;

describe("Article component", () => {
  beforeEach(() => {JestFetchMock.resetMocks()});

  testPromise("renders without crashing", () => {
    ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.article, ());

    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/article/slug"));

    DomTestingLibrary.waitForElement(
      ~callback=
        () =>
          wrapper |> getByText(~matcher=`Str("How to train your dragon")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("How to train your dragon"))
         |> expect
         |> toBeInTheDocument
         |> resolve
       );
  });

  testPromise(
    "renders content, author, date, favorite button and follow button", () => {
    ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.article |> ApiMock.comments, ());

    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/article/slug"));

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("Very carefully.")),
      (),
    )
    |> then_(_ => {
         let _ =
           wrapper
           |> getAllByText(~matcher=`Str("Favorite Article"))
           |> expect
           |> toHaveLength(2);

         let _ =
           wrapper
           |> getAllByText(~matcher=`Str("Follow johnnyjacob"))
           |> expect
           |> toHaveLength(2);

         wrapper
         |> getByText(~matcher=`Str("Very carefully."))
         |> expect
         |> toBeInTheDocument
         |> resolve;
       });
  });
});
