open Jest;
open Expect;
open Js.Promise;
open JestDom;
open ReactTestingLibrary;
open BsJestFetchMock;
open TestUtils;

describe("App component", () => {
  beforeEach(() => {JestFetchMock.resetMocks()});

  testPromise("renders without crashing", () => {
    ApiMock.doMock(
      ~pipeline=
        ApiMock.succeed
        |> ApiMock.articles
        |> ApiMock.user
        |> ApiMock.tags
        |> ApiMock.feeds,
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
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("A place to share your knowledge.")
         |> resolve
       );
  });

  testPromise("renders settings page", () => {
    ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.user, ());

    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/settings"));

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("Your Settings")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Your Settings"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Your Settings")
         |> resolve
       );
  });

  testPromise("renders login page", () => {
    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/login"));

    DomTestingLibrary.waitForElement(
      ~callback=
        () => wrapper |> getByText(~matcher=`Str("Need an account?")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Need an account?"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Need an account?")
         |> resolve
       );
  });

  testPromise("renders register page", () => {
    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/register"));

    DomTestingLibrary.waitForElement(
      ~callback=
        () => wrapper |> getByText(~matcher=`Str("Have an account?")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Have an account?"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Have an account?")
         |> resolve
       );
  });

  testPromise("renders create article page", () => {
    ApiMock.doMock(~pipeline=ApiMock.succeed |> ApiMock.user, ());

    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/editor"));

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("Publish Article")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Publish Article"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Publish Article")
         |> resolve
       );
  });

  testPromise("renders edit article page", () => {
    ApiMock.doMock(
      ~pipeline=ApiMock.succeed |> ApiMock.user |> ApiMock.article,
      (),
    );

    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/editor/slug"));

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("Publish Article")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Publish Article"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Publish Article")
         |> resolve
       );
  });

  testPromise("renders article page", () => {
    ApiMock.doMock(
      ~pipeline=
        ApiMock.succeed |> ApiMock.article |> ApiMock.user |> ApiMock.comments,
      (),
    );

    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/article/slug"));

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

  testPromise("renders user profile page", () => {
    ApiMock.doMock(
      ~pipeline=
        ApiMock.succeed |> ApiMock.user |> ApiMock.profile |> ApiMock.articles,
      (),
    );

    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/profile/jihchi"));

    DomTestingLibrary.waitForElement(
      ~callback=() => wrapper |> getByText(~matcher=`Str("My Articles")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("My Articles"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("My Articles")
         |> resolve
       );
  });

  testPromise("renders user favorites page", () => {
    ApiMock.doMock(
      ~pipeline=
        ApiMock.succeed |> ApiMock.user |> ApiMock.profile |> ApiMock.articles,
      (),
    );

    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/profile/jihchi/favorites"));

    DomTestingLibrary.waitForElement(
      ~callback=
        () => wrapper |> getByText(~matcher=`Str("Favorited Articles")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("Favorited Articles"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("Favorited Articles")
         |> resolve
       );
  });

  describe("Header", () => {
    describe("Anonymous", () => {
      testPromise({|show "Home" link|}, () => {
        ApiMock.doMock(
          ~pipeline=ApiMock.succeed |> ApiMock.articles,
          ~init=ApiMock.unathorized401,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Home")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> getByText(~matcher=`Str("Home"))
             |> expect
             |> toBeInTheDocument
             |> resolve
           );
      });

      testPromise({|show "Sign in" link|}, () => {
        ApiMock.doMock(
          ~pipeline=ApiMock.succeed |> ApiMock.articles,
          ~init=ApiMock.unathorized401,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Sign in")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> getByText(~matcher=`Str("Sign in"))
             |> expect
             |> toBeInTheDocument
             |> resolve
           );
      });

      testPromise({|show "Sign up" link|}, () => {
        ApiMock.doMock(
          ~pipeline=ApiMock.succeed |> ApiMock.articles,
          ~init=ApiMock.unathorized401,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Sign up")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> getByText(~matcher=`Str("Sign up"))
             |> expect
             |> toBeInTheDocument
             |> resolve
           );
      });

      testPromise({|should not show "New Post" link|}, () => {
        ApiMock.doMock(
          ~pipeline=ApiMock.succeed |> ApiMock.articles,
          ~init=ApiMock.unathorized401,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Sign in")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> TestUtils.queryByText(~matcher=`Str("New Post"))
             |> expect
             |> toEqual(Js.null)
             |> resolve
           );
      });

      testPromise({|should not show "Settings" link|}, () => {
        ApiMock.doMock(
          ~pipeline=ApiMock.succeed |> ApiMock.articles,
          ~init=ApiMock.unathorized401,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Sign in")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> TestUtils.queryByText(~matcher=`Str("Settings"))
             |> expect
             |> toEqual(Js.null)
             |> resolve
           );
      });

      testPromise({|should not show user name|}, () => {
        ApiMock.doMock(
          ~pipeline=ApiMock.succeed |> ApiMock.articles,
          ~init=ApiMock.unathorized401,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Sign in")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> TestUtils.queryByText(~matcher=`Str("Jihchi Lee"))
             |> expect
             |> toEqual(Js.null)
             |> resolve
           );
      });
    });

    describe("Authenticated", () => {
      testPromise({|show "Home" link|}, () => {
        ApiMock.doMock(
          ~pipeline=
            ApiMock.succeed
            |> ApiMock.user
            |> ApiMock.tags
            |> ApiMock.articles
            |> ApiMock.profile,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Home")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> getByText(~matcher=`Str("Home"))
             |> expect
             |> toBeInTheDocument
             |> resolve
           );
      });

      testPromise({|should not show "Sign in" link|}, () => {
        ApiMock.doMock(
          ~pipeline=
            ApiMock.succeed
            |> ApiMock.user
            |> ApiMock.tags
            |> ApiMock.feeds
            |> ApiMock.articles
            |> ApiMock.profile,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("New Post")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> TestUtils.queryByText(~matcher=`Str("Sign in"))
             |> expect
             |> toEqual(Js.null)
             |> resolve
           );
      });

      testPromise({|should not show "Sign up" link|}, () => {
        ApiMock.doMock(
          ~pipeline=
            ApiMock.succeed
            |> ApiMock.user
            |> ApiMock.tags
            |> ApiMock.feeds
            |> ApiMock.articles
            |> ApiMock.profile,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("New Post")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> TestUtils.queryByText(~matcher=`Str("Sign up"))
             |> expect
             |> toEqual(Js.null)
             |> resolve
           );
      });

      testPromise({|show "New Post" link|}, () => {
        ApiMock.doMock(
          ~pipeline=
            ApiMock.succeed
            |> ApiMock.user
            |> ApiMock.tags
            |> ApiMock.feeds
            |> ApiMock.articles
            |> ApiMock.profile,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("New Post")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> getByText(~matcher=`Str("New Post"))
             |> expect
             |> toBeInTheDocument
             |> resolve
           );
      });

      testPromise({|show "Settings" link|}, () => {
        ApiMock.doMock(
          ~pipeline=
            ApiMock.succeed
            |> ApiMock.user
            |> ApiMock.tags
            |> ApiMock.feeds
            |> ApiMock.articles
            |> ApiMock.profile,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Settings")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> getByText(~matcher=`Str("Settings"))
             |> expect
             |> toBeInTheDocument
             |> resolve
           );
      });

      testPromise({|show user name|}, () => {
        ApiMock.doMock(
          ~pipeline=
            ApiMock.succeed
            |> ApiMock.user
            |> ApiMock.tags
            |> ApiMock.feeds
            |> ApiMock.articles
            |> ApiMock.profile,
          (),
        );

        let wrapper = render(<App />);

        DomTestingLibrary.waitForElement(
          ~callback=() => wrapper |> getByText(~matcher=`Str("Jihchi Lee")),
          (),
        )
        |> then_(_ =>
             wrapper
             |> getByText(~matcher=`Str("Jihchi Lee"))
             |> expect
             |> toBeInTheDocument
             |> resolve
           );
      });
    });
  });
});
