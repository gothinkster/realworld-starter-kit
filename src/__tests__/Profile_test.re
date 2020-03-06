open Js.Promise;
open Jest;
open Expect;
open BsJestFetchMock;
open ReactTestingLibrary;
open TestUtils;

describe("Profile component", () => {
  beforeEach(() => {JestFetchMock.resetMocks()});

  testPromise("renders without crashing", () => {
    ApiMock.doMock(
      ~pipeline=
        ApiMock.succeed |> ApiMock.profile |> ApiMock.articles |> ApiMock.user,
      (),
    );

    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/profile/jihchi"));

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

  testPromise("renders someone's favorited articles", () => {
    ApiMock.doMock(
      ~pipeline=
        ApiMock.succeed |> ApiMock.profile |> ApiMock.articles |> ApiMock.user,
      (),
    );

    let wrapper = render(<App />);

    TestUtils.act(() => ReasonReactRouter.push("#/profile/jihchi/favorites"));

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

  Skip.describe("follow button", () => {
    test(
      {|show "Edit Profile Settings" when author is looking at itself profile|},
      () =>
      expect(true) |> toEqual(true)
    );

    test(
      {|redirect to profile editing page when click on "Edit Profile Settings" button|},
      () =>
      expect(true) |> toEqual(true)
    );

    test("follow author when click on Follow button", () =>
      expect(true) |> toEqual(true)
    );

    test("unfollow author when click on Unfollow button", () =>
      expect(true) |> toEqual(true)
    );

    test("redirect to register when anonymous clicks on Follow button", () =>
      expect(true) |> toEqual(true)
    );
  });

  Skip.test("shows authorial articles with different page", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("shows favorited articles with different page", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    "reset to first page when switching from favorited to authorial", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    "reset to first page when switching from authorial to favorited", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("favorite article when click on favorite icon", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("unfavorite article when click on unfavorite icon", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    "redirect to register page when anonymous clicks on favorite icon", () =>
    expect(true) |> toEqual(true)
  );
});
