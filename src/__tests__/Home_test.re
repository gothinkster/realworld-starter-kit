open Js.Promise;
open Jest;
open Expect;
open JestDom;
open ReactTestingLibrary;
open BsJestFetchMock;
open TestUtils;

module Option = Relude.Option;

describe("Home component", () => {
  beforeEach(() => {JestFetchMock.resetMocks()});

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

  testPromise("Query data aginst /list/articles endpoint", () => {
    let wrapper = render(<App />);

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("Global Feed")),
      (),
    )
    |> then_(_ => {
         TestUtils.ApiMock.fetch##calls
         |> Belt.Array.some(_, call =>
              call
              |> Belt.Array.get(_, 0)
              |> Option.getOrElse("")
              == "http://mock_your_requests/api/articles?limit=10&offset=0"
            )
         |> expect
         |> toEqual(true)
         |> resolve
       });
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
          ApiMock.succeed |> ApiMock.user |> ApiMock.tags |> ApiMock.feeds,
        (),
      );

      let wrapper = render(<App />);

      DomTestingLibrary.waitForElement(
        ~callback=() => wrapper |> getByText(~matcher=`Str("Your Feed")),
        (),
      )
      |> then_(_ =>
           wrapper
           |> getByText(
                ~matcher=`Str("Would you like some sugar in your coffee?"),
              )
           |> expect
           |> toBeInTheDocument
           |> resolve
         );
    },
  );

  describe("Popular Tags", () => {
    testPromise({|Actived Tab: "Your Feed" > "# <tag>"|}, () => {
      ApiMock.doMock(
        ~pipeline=
          ApiMock.succeed |> ApiMock.user |> ApiMock.tags |> ApiMock.feeds,
        (),
      );

      let wrapper = render(<App />);

      DomTestingLibrary.waitForElement(
        ~callback=() => wrapper |> getByText(~matcher=`Str("Your Feed")),
        (),
      )
      |> then_(_ => {
           wrapper
           |> getByTestId("tag-list")
           |> DomTestingLibrary.getByText(~matcher=`Str("dragons"))
           |> FireEvent.click
           |> resolve
         })
      |> then_(_ =>
           wrapper
           |> getByTestId("feed-toggle")
           |> DomTestingLibrary.getByText(~matcher=`Str("dragons"))
           |> expect
           |> toBeInTheDocument
           |> resolve
         );
    });

    testPromise({|Actived Tab: "Your Feed" > "Global Feed" > "# <tag>"|}, () => {
      ApiMock.doMock(
        ~pipeline=
          ApiMock.succeed |> ApiMock.user |> ApiMock.tags |> ApiMock.feeds,
        (),
      );

      let wrapper = render(<App />);

      DomTestingLibrary.waitForElement(
        ~callback=() => wrapper |> getByText(~matcher=`Str("Your Feed")),
        (),
      )
      |> then_(_ => {
           JestFetchMock.resetMocks();
           ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.articles, ());

           wrapper
           |> getByText(~matcher=`Str("Global Feed"))
           |> FireEvent.click
           |> ignore;

           DomTestingLibrary.waitForElement(
             ~callback=
               () =>
                 wrapper
                 |> getByText(~matcher=`Str("How to train your dragon")),
             (),
           );
         })
      |> then_(_ => {
           JestFetchMock.resetMocks();
           ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.articles, ());

           wrapper
           |> getByTestId("tag-list")
           |> DomTestingLibrary.getByText(~matcher=`Str("dragons"))
           |> FireEvent.click
           |> resolve;
         })
      |> then_(_ =>
           wrapper
           |> getByTestId("feed-toggle")
           |> DomTestingLibrary.getByText(~matcher=`Str("dragons"))
           |> expect
           |> toBeInTheDocument
           |> resolve
         );
    });

    testPromise(
      {|Query data aginst /list/articles endpoint even current tab is "Your Feed"|},
      () => {
        ApiMock.doMock(
          ~pipeline=
            ApiMock.succeed |> ApiMock.user |> ApiMock.tags |> ApiMock.feeds,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Your Feed")),
          (),
        )
        |> then_(_ => {
             wrapper
             |> getByTestId("tag-list")
             |> DomTestingLibrary.getByText(~matcher=`Str("dragons"))
             |> FireEvent.click
             |> resolve
           })
        |> then_(_ => {
             TestUtils.ApiMock.fetch##calls
             |> Belt.Array.getExn(_, 0)
             |> Belt.Array.getExn(_, 0)
             |> expect
             |> toEqual(
                  "http://mock_your_requests/api/articles?limit=10&offset=0&tag=dragons",
                )
             |> resolve
           });
      },
    );
  });
});
