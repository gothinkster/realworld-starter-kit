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
    "renders content, author, date, favorite button and follow button (anonymous user)",
    () => {
      ApiMock.doMock(
        ~pipeline=ApiMock.succeed |> ApiMock.article |> ApiMock.comments,
        (),
      );

      let wrapper = render(<App />);

      TestUtils.act(() => ReasonReactRouter.push("#/article/slug"));

      DomTestingLibrary.waitForElement(
        ~callback=
          () => wrapper |> getByText(~matcher=`Str("Very carefully.")),
        (),
      )
      |> then_(_ => {
           let actual = (
             wrapper
             |> getByText(~matcher=`Str("Very carefully."))
             |> Webapi.Dom.Element.innerHTML,
             wrapper
             |> getAllByText(~matcher=`Str("Favorite Article"))
             |> Relude.Array.size,
             wrapper
             |> getAllByText(~matcher=`Str("Follow johnnyjacob"))
             |> Relude.Array.size,
             wrapper
             |> getByText(~matcher=`Str("this is a good comment"))
             |> Webapi.Dom.Element.innerHTML,
           );

           actual
           |> expect
           |> toEqual(("Very carefully.", 2, 2, "this is a good comment"))
           |> resolve;
         });
    },
  );
});
