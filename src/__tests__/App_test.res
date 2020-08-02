open Jest
open Expect
open Js.Promise
open ReactTestingLibrary
open BsJestFetchMock
open TestUtils

describe("App component", () => {
  beforeEach(() => JestFetchMock.resetMocks())

  testPromise("renders without crashing", () => {
    {
      open ApiMock
      doMock(~pipeline=succeed |> articles |> user |> tags |> feeds, ())
    }

    let wrapper = render(<App />)

    DomTestingLibrary.waitFor(
      ~callback=() =>
        wrapper |> getByText(~matcher=#Str("A place to share your knowledge.")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("A place to share your knowledge."))
      |> Webapi.Dom.Element.innerHTML
      |> expect
      |> toEqual("A place to share your knowledge.")
      |> resolve
    )
  })

  testPromise("renders settings page", () => {
    {
      open ApiMock
      doMock(~pipeline=succeed |> user, ())
    }

    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("/#/settings"))

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

  testPromise("renders login page", () => {
    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("/#/login"))

    DomTestingLibrary.waitFor(
      ~callback=() => wrapper |> getByText(~matcher=#Str("Need an account?")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("Need an account?"))
      |> Webapi.Dom.Element.innerHTML
      |> expect
      |> toEqual("Need an account?")
      |> resolve
    )
  })

  testPromise("renders register page", () => {
    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("/#/register"))

    DomTestingLibrary.waitFor(
      ~callback=() => wrapper |> getByText(~matcher=#Str("Have an account?")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("Have an account?"))
      |> Webapi.Dom.Element.innerHTML
      |> expect
      |> toEqual("Have an account?")
      |> resolve
    )
  })

  testPromise("renders create article page", () => {
    {
      open ApiMock
      doMock(~pipeline=succeed |> user, ())
    }

    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("/#/editor"))

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

  testPromise("renders edit article page", () => {
    {
      open ApiMock
      doMock(~pipeline=succeed |> user |> article, ())
    }

    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("/#/editor/slug"))

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

  testPromise("renders article page", () => {
    {
      open ApiMock
      doMock(~pipeline=succeed |> article |> user |> comments, ())
    }

    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("/#/article/slug"))

    DomTestingLibrary.waitFor(
      ~callback=() => wrapper |> getByText(~matcher=#Str("How to train your dragon")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("How to train your dragon"))
      |> JestDom.expect
      |> JestDom.toBeInTheDocument
      |> resolve
    )
  })

  testPromise("renders user profile page", () => {
    {
      open ApiMock
      doMock(~pipeline=succeed |> user |> profile |> articles, ())
    }

    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("/#/profile/jihchi"))

    DomTestingLibrary.waitFor(
      ~callback=() => wrapper |> getByText(~matcher=#Str("My Articles")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("My Articles"))
      |> Webapi.Dom.Element.innerHTML
      |> expect
      |> toEqual("My Articles")
      |> resolve
    )
  })

  testPromise("renders user favorites page", () => {
    {
      open ApiMock
      doMock(~pipeline=succeed |> user |> profile |> articles, ())
    }

    let wrapper = render(<App />)

    act(() => ReasonReactRouter.push("/#/profile/jihchi/favorites"))

    DomTestingLibrary.waitFor(
      ~callback=() => wrapper |> getByText(~matcher=#Str("Favorited Articles")) |> ignore,
      (),
    ) |> then_(_ =>
      wrapper
      |> getByText(~matcher=#Str("Favorited Articles"))
      |> Webapi.Dom.Element.innerHTML
      |> expect
      |> toEqual("Favorited Articles")
      |> resolve
    )
  })

  describe("Header", () => {
    describe("Anonymous", () => {
      testPromise(`show "Home" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> articles, ~init=unathorized401, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Home")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper
          |> getByText(~matcher=#Str("Home"))
          |> JestDom.expect
          |> JestDom.toBeInTheDocument
          |> resolve
        )
      })

      testPromise(`show "Sign in" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> articles, ~init=unathorized401, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Sign in")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper
          |> getByText(~matcher=#Str("Sign in"))
          |> JestDom.expect
          |> JestDom.toBeInTheDocument
          |> resolve
        )
      })

      testPromise(`show "Sign up" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> articles, ~init=unathorized401, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Sign up")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper
          |> getByText(~matcher=#Str("Sign up"))
          |> JestDom.expect
          |> JestDom.toBeInTheDocument
          |> resolve
        )
      })

      testPromise(`should not show "New Post" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> articles, ~init=unathorized401, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Sign in")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper |> queryByText(~matcher=#Str("New Post")) |> expect |> toEqual(Js.null) |> resolve
        )
      })

      testPromise(`should not show "Settings" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> articles, ~init=unathorized401, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Sign in")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper |> queryByText(~matcher=#Str("Settings")) |> expect |> toEqual(Js.null) |> resolve
        )
      })

      testPromise(`should not show user name`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> articles, ~init=unathorized401, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Sign in")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper
          |> queryByText(~matcher=#Str("Jihchi Lee"))
          |> expect
          |> toEqual(Js.null)
          |> resolve
        )
      })
    })

    describe("Authenticated", () => {
      testPromise(`show "Home" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> user |> tags |> articles |> profile, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Home")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper
          |> getByText(~matcher=#Str("Home"))
          |> JestDom.expect
          |> JestDom.toBeInTheDocument
          |> resolve
        )
      })

      testPromise(`should not show "Sign in" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> user |> tags |> feeds |> articles |> profile, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("New Post")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper |> queryByText(~matcher=#Str("Sign in")) |> expect |> toEqual(Js.null) |> resolve
        )
      })

      testPromise(`should not show "Sign up" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> user |> tags |> feeds |> articles |> profile, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("New Post")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper |> queryByText(~matcher=#Str("Sign up")) |> expect |> toEqual(Js.null) |> resolve
        )
      })

      testPromise(`show "New Post" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> user |> tags |> feeds |> articles |> profile, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("New Post")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper
          |> getByText(~matcher=#Str("New Post"))
          |> JestDom.expect
          |> JestDom.toBeInTheDocument
          |> resolve
        )
      })

      testPromise(`show "Settings" link`, () => {
        {
          open ApiMock
          doMock(~pipeline=succeed |> user |> tags |> feeds |> articles |> profile, ())
        }

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Settings")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper
          |> getByText(~matcher=#Str("Settings"))
          |> JestDom.expect
          |> JestDom.toBeInTheDocument
          |> resolve
        )
      })

      testPromise("show user name", () => {
        open ApiMock

        doMock(~pipeline=succeed |> user |> tags |> feeds |> articles |> profile, ())

        let wrapper = render(<App />)

        DomTestingLibrary.waitFor(
          ~callback=() => wrapper |> getByText(~matcher=#Str("Jihchi Lee")) |> ignore,
          (),
        ) |> then_(_ =>
          wrapper
          |> getByText(~matcher=#Str("Jihchi Lee"))
          |> JestDom.expect
          |> JestDom.toBeInTheDocument
          |> resolve
         )
      })
    })
  })
})
