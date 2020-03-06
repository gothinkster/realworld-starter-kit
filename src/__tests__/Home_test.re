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
    ApiMock.doMock(
      ~pipeline=ApiMock.succeed |> ApiMock.articles |> ApiMock.tags,
      (),
    );

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
             wrapper |> TestUtils.queryByText(~matcher=`Str("Your Feed")),
             wrapper
             |> getByText(~matcher=`Str("Global Feed"))
             |> Webapi.Dom.Element.innerHTML,
           )
           |> expect
           |> toEqual((Js.null, "Global Feed"))
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
          ApiMock.succeed
          |> ApiMock.user
          |> ApiMock.tags
          |> ApiMock.feeds
          |> ApiMock.articles,
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
      {|Query data against /list/articles endpoint even current tab is "Your Feed"|},
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
             JestFetchMock.resetMocks();
             ApiMock.doMock(
               ~pipeline=ApiMock.succeed |> ApiMock.articles,
               (),
             );

             wrapper
             |> getByTestId("tag-list")
             |> DomTestingLibrary.getByText(~matcher=`Str("dragons"))
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
             TestUtils.ApiMock.fetch##calls
             |> Belt.Array.map(_, call =>
                  call->Belt.Array.get(0)->Option.getOrElse("", _)
                )
             |> Belt.Array.some(_, url =>
                  url
                  == "http://mock_your_requests/api/articles?limit=10&offset=0&tag=dragons"
                )
             |> expect
             |> toEqual(true)
             |> resolve
           });
      },
    );
  });

  describe("Pagination", () => {
    Skip.testPromise("do not show any page item (failed to load articles)", () => {
      ApiMock.doMock(
        ~pipeline=ApiMock.succeed |> ApiMock.tags |> ApiMock.user,
        (),
      );

      let wrapper = render(<App />);

      DomTestingLibrary.waitForElement(
        ~callback=() => wrapper |> getByText(~matcher=`Str("dragons")),
        (),
      )
      |> then_(_ =>
           wrapper
           |> TestUtils.queryByTestId("page-link")
           |> expect
           |> toEqual(Js.null)
           |> resolve
         );
    });

    testPromise("show only one page", () => {
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
           wrapper
           |> getByTestId("page-link")
           |> DomTestingLibrary.getByText(~matcher=`Str("1"))
           |> expect
           |> toBeInTheDocument
           |> resolve
         );
    });

    testPromise("show 2 pages (aliquot)", () => {
      ApiMock.doMock(
        ~pipeline=
          ApiMock.succeed
          |> ApiMock.tags
          |> ApiMock.articles(~articlesCount=20),
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
           [|
             wrapper
             |> getByTestId("page-link")
             |> DomTestingLibrary.getByText(~matcher=`Str("1"))
             |> Webapi.Dom.Element.innerHTML,
             wrapper
             |> getByTestId("page-link")
             |> DomTestingLibrary.getByText(~matcher=`Str("2"))
             |> Webapi.Dom.Element.innerHTML,
           |]
           |> expect
           |> toEqual([|"1", "2"|])
           |> resolve
         );
    });

    testPromise("show 2 pages (aliquant)", () => {
      ApiMock.doMock(
        ~pipeline=
          ApiMock.succeed
          |> ApiMock.tags
          |> ApiMock.articles(~articlesCount=21),
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
           [|
             wrapper
             |> getByTestId("page-link")
             |> DomTestingLibrary.getByText(~matcher=`Str("1"))
             |> Webapi.Dom.Element.innerHTML,
             wrapper
             |> getByTestId("page-link")
             |> DomTestingLibrary.getByText(~matcher=`Str("2"))
             |> Webapi.Dom.Element.innerHTML,
           |]
           |> expect
           |> toEqual([|"1", "2"|])
           |> resolve
         );
    });
  });
});
