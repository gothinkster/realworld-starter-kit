open Js.Promise
open Jest
open Expect
open BsJestFetchMock
open ReactTestingLibrary
open TestUtils
open ApiMock

describe("Editor component", () => {
  beforeEach(() => JestFetchMock.resetMocks())

  testPromise("renders without crashing", () => {
    doMock(~pipeline=succeed |> user, ())

    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("#/editor"))

    DomTestingLibrary.waitFor(
      ~callback=() => wrapper |> getByText(~matcher=#Str("Publish Article")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("Publish Article"))
      |> Webapi.Dom.Element.innerHTML
      |> expect
      |> toEqual("Publish Article")
      |> resolve
    )
  })

  testPromise("renders screen in editing mode", () => {
    doMock(~pipeline=succeed |> article |> user, ())

    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("#/editor/slug"))

    DomTestingLibrary.waitFor(
      ~callback=() => wrapper |> getByText(~matcher=#Str("Publish Article")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("Publish Article"))
      |> Webapi.Dom.Element.innerHTML
      |> expect
      |> toEqual("Publish Article")
      |> resolve
    )
  })
})
