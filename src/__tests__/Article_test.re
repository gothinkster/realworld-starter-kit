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

  // TODO: delete following line when we have more than 1 test case
  ();
});
