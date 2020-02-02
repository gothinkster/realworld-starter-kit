open Jest;
open Expect;
open Js.Promise;
open ReactTestingLibrary;
open TestUtils;

describe("App component", () => {
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
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("A place to share your knowledge.")
         |> resolve
       );
  });

  testPromise("renders settings page", () => {
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
    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/article/slug"));

    DomTestingLibrary.waitForElement(
      ~callback=
        () =>
          wrapper
          |> getByText(~matcher=`Str("How to build webapps that scale")),
      (),
    )
    |> then_(_ =>
         wrapper
         |> getByText(~matcher=`Str("How to build webapps that scale"))
         |> Webapi.Dom.Element.innerHTML
         |> expect
         |> toEqual("How to build webapps that scale")
         |> resolve
       );
  });

  testPromise("renders user profile page", () => {
    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/profile/someone"));

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
    let wrapper = render(<App />);

    act(() => ReasonReactRouter.push("/#/profile/someone/favorites"));

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
});
