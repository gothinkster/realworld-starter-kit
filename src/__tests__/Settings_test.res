open Js.Promise
open Jest
open Expect
open BsJestFetchMock
open ReactTestingLibrary
open TestUtils
open ApiMock

describe("Settings component", () => {
  beforeEach(() => JestFetchMock.resetMocks())

  testPromise("renders without crashing", () => {
    doMock(~pipeline=succeed |> user |> articles |> tags, ())

    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("#/settings"))

    DomTestingLibrary.waitFor(
      ~callback=() => wrapper |> getByText(~matcher=#Str("Your Settings")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("Your Settings"))
      |> Webapi.Dom.Element.innerHTML
      |> expect
      |> toEqual("Your Settings")
      |> resolve
    )
  })
})
