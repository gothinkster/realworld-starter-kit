open Js.Promise
open Relude.Globals
open Jest
open Expect
open ReactTestingLibrary
open BsJestFetchMock
open TestUtils

module Option = Relude.Option

describe("Home component", () => {
  beforeEach(() => JestFetchMock.resetMocks())

  testPromise("renders without crashing", () => {
    ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.articles |> ApiMock.tags, ())

    let wrapper = render(<App />)

    DomTestingLibrary.waitFor(
      ~callback=() =>
        wrapper |> getByText(~matcher=#Str("A place to share your knowledge.")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("A place to share your knowledge."))
      |> JestDom.expect
      |> JestDom.toBeInTheDocument
      |> resolve
    )
  })

  testPromise(
    `"Global Feed" should be actived and "You Feed" tab should be invisible when user is anonymous`,
    () => {
      ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.tags |> ApiMock.articles, ())

      let wrapper = render(<App />)

      DomTestingLibrary.waitFor(
        ~callback=() => wrapper |> getByText(~matcher=#Str("How to train your dragon")) |> ignore,
        (),
      ) |> then_(_ =>
        (
          wrapper |> queryByText(~matcher=#Str("Your Feed")),
          wrapper |> getByText(~matcher=#Str("Global Feed")) |> Webapi.Dom.Element.innerHTML,
        )
        |> expect
        |> toEqual((Js.null, "Global Feed"))
        |> resolve
      )
    },
  )

  testPromise(
    `"You Feed" tab should be actived when user is logged in and it is first time to visit`,
    () => {
      ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.user |> ApiMock.tags |> ApiMock.feeds, ())

      let wrapper = render(<App />)

      DomTestingLibrary.waitFor(
        ~callback=() => wrapper |> getByText(~matcher=#Str("Your Feed")) |> ignore,
        (),
      ) |> then_(_ =>
        wrapper
        |> getByText(~matcher=#Str("How to train your dragon"))
        |> JestDom.expect
        |> JestDom.toBeInTheDocument
        |> resolve
      )
    },
  )

  describe("Popular Tags", () => {
    testPromise(`Actived Tab: "Your Feed" > "# <tag>"`, () => {
      ApiMock.doMock(
        ~pipeline=ApiMock.succeed
        |> ApiMock.user
        |> ApiMock.tags
        |> ApiMock.feeds
        |> ApiMock.articles,
        (),
      )

      let wrapper = render(<App />)

      DomTestingLibrary.waitFor(
        ~callback=() => wrapper |> getByText(~matcher=#Str("Your Feed")) |> ignore,
        (),
      )
      |> then_(_ => {
        wrapper
        |> getByTestId(~matcher=#Str("tag-list"))
        |> DomTestingLibrary.getByText(~matcher=#Str("dragons"))
        |> FireEvent.click
        |> ignore

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("How to train your dragon")) |> ignore,
          (),
        )
      })
      |> then_(_ =>
        wrapper
        |> getByTestId(~matcher=#Str("feed-toggle"))
        |> DomTestingLibrary.getByText(~matcher=#Str("dragons"))
        |> JestDom.expect
        |> JestDom.toBeInTheDocument
        |> resolve
      )
    })

    testPromise(`Actived Tab: "Your Feed" > "Global Feed" > "# <tag>"`, () => {
      ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.user |> ApiMock.tags |> ApiMock.feeds, ())

      let wrapper = render(<App />)

      DomTestingLibrary.waitFor(
        ~callback=() => wrapper |> getByText(~matcher=#Str("Your Feed")) |> ignore,
        (),
      )
      |> then_(_ => {
        JestFetchMock.resetMocks()
        ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.articles, ())

        wrapper |> getByText(~matcher=#Str("Global Feed")) |> FireEvent.click |> ignore

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("How to train your dragon")) |> ignore,
          (),
        )
      })
      |> then_(_ => {
        JestFetchMock.resetMocks()
        ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.articles, ())

        wrapper
        |> getByTestId(~matcher=#Str("tag-list"))
        |> DomTestingLibrary.getByText(~matcher=#Str("dragons"))
        |> FireEvent.click
        |> ignore

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("How to train your dragon")) |> ignore,
          (),
        )
      })
      |> then_(_ =>
        wrapper
        |> getByTestId(~matcher=#Str("feed-toggle"))
        |> DomTestingLibrary.getByText(~matcher=#Str("dragons"))
        |> JestDom.expect
        |> JestDom.toBeInTheDocument
        |> resolve
      )
    })

    testPromise(
      `Query data against /list/articles endpoint even current tab is "Your Feed"`,
      () => {
        ApiMock.doMock(
          ~pipeline=ApiMock.succeed |> ApiMock.user |> ApiMock.tags |> ApiMock.feeds,
          (),
        )

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Your Feed")) |> ignore,
          (),
        )
        |> then_(_ => {
          JestFetchMock.resetMocks()
          ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.articles, ())

          wrapper
          |> getByTestId(~matcher=#Str("tag-list"))
          |> DomTestingLibrary.getByText(~matcher=#Str("dragons"))
          |> FireEvent.click
          |> ignore

          DomTestingLibrary.waitFor(
            ~callback=() =>
              wrapper |> getByText(~matcher=#Str("How to train your dragon")) |> ignore,
            (),
          )
        })
        |> then_(_ =>
          TestUtils.ApiMock.fetch["calls"]
          |> Array.map(call => call |> Array.at(0) |> Option.getOrElse("", _))
          |> Array.any(url =>
            url == "http://mock_your_requests/api/articles?limit=10&offset=0&tag=dragons"
          )
          |> expect
          |> toEqual(true)
          |> resolve
        )
      },
    )
  })

  describe("Pagination", () => {
    Skip.testPromise("do not show any page item (failed to load articles)", () => {
      ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.tags |> ApiMock.user, ())

      let wrapper = render(<App />)

      DomTestingLibrary.waitFor(
        ~callback=() => wrapper |> getByText(~matcher=#Str("dragons")) |> ignore,
        (),
      ) |> then_(_ =>
        wrapper
        |> queryByTestId(~matcher=#Str("page-link"))
        |> expect
        |> toEqual(Js.null)
        |> resolve
      )
    })

    testPromise("show only one page", () => {
      ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.tags |> ApiMock.articles, ())

      let wrapper = render(<App />)

      DomTestingLibrary.waitFor(
        ~callback=() => wrapper |> getByText(~matcher=#Str("How to train your dragon")) |> ignore,
        (),
      ) |> then_(_ =>
        wrapper
        |> getByTestId(~matcher=#Str("page-link"))
        |> DomTestingLibrary.getByText(~matcher=#Str("1"))
        |> JestDom.expect
        |> JestDom.toBeInTheDocument
        |> resolve
      )
    })

    testPromise("show 2 pages (aliquot)", () => {
      ApiMock.doMock(
        ~pipeline=ApiMock.succeed |> ApiMock.tags |> ApiMock.articles(~articlesCount=20),
        (),
      )

      let wrapper = render(<App />)

      DomTestingLibrary.waitFor(
        ~callback=() => wrapper |> getByText(~matcher=#Str("How to train your dragon")) |> ignore,
        (),
      ) |> then_(_ =>
        [
          wrapper
          |> getByTestId(~matcher=#Str("page-link"))
          |> DomTestingLibrary.getByText(~matcher=#Str("1"))
          |> Webapi.Dom.Element.innerHTML,
          wrapper
          |> getByTestId(~matcher=#Str("page-link"))
          |> DomTestingLibrary.getByText(~matcher=#Str("2"))
          |> Webapi.Dom.Element.innerHTML,
        ]
        |> expect
        |> toEqual(["1", "2"])
        |> resolve
      )
    })

    testPromise("show 2 pages (aliquant)", () => {
      open ApiMock

      doMock(
        ~pipeline=succeed |> tags |> articles(~articlesCount=21),
        (),
      )

      let wrapper = render(<App />)

      DomTestingLibrary.waitFor(
        ~callback=() => wrapper |> getByText(~matcher=#Str("How to train your dragon")) |> ignore,
        (),
      ) |> then_(_ =>
        [
          wrapper
          |> getByTestId(~matcher=#Str("page-link"))
          |> DomTestingLibrary.getByText(~matcher=#Str("1"))
          |> Webapi.Dom.Element.innerHTML,
          wrapper
          |> getByTestId(~matcher=#Str("page-link"))
          |> DomTestingLibrary.getByText(~matcher=#Str("2"))
          |> Webapi.Dom.Element.innerHTML,
        ]
        |> expect
        |> toEqual(["1", "2"])
        |> resolve
      )
    })
  })
})
