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

  testPromise(
    "renders content, author, date, favorite button and follow button (anonymous user)",
    () => {
      ApiMock.doMock(
        ~pipeline=ApiMock.succeed |> ApiMock.article |> ApiMock.comments,
        (),
      );

      let wrapper = render(<App />);

      TestUtils.act(() => ReasonReactRouter.push("#/article/slug"));

      DomTestingLibrary.waitForElement(
        ~callback=
          () => wrapper |> getByText(~matcher=`Str("Very carefully.")),
        (),
      )
      |> then_(_ => {
           let actual = (
             wrapper
             |> getByText(~matcher=`Str("Very carefully."))
             |> Webapi.Dom.Element.innerHTML,
             wrapper
             |> getAllByText(~matcher=`Str("Favorite Article"))
             |> Relude.Array.size,
             wrapper
             |> getAllByText(~matcher=`Str("(12)"))
             |> Relude.Array.size,
             wrapper
             |> getAllByText(~matcher=`Str("Follow johnnyjacob"))
             |> Relude.Array.size,
             wrapper
             |> getByText(~matcher=`Str("this is a good comment"))
             |> Webapi.Dom.Element.innerHTML,
           );

           actual
           |> expect
           |> toEqual(("Very carefully.", 2, 2, 2, "this is a good comment"))
           |> resolve;
         });
    },
  );

  Skip.test(
    "clicking follow button will be redirect to register page (anonymous)", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    "clicking favorite button will be redirect to register page (anonymous)",
    () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    {|renders "Sign in or sign up to add comments on this article." (anonymous)|},
    () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("renders followed button (authenticated)", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("renders favorited button (authenticated)", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    {|invoke "follow" API when click on follow button (authenticated)|}, () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    {|invoke "unfollow" API when click on followed button (authenticated)|}, () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    {|invoke "favorite" API when click on favorite button (authenticated)|}, () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    {|invoke "unfavorite" API when click on favorited button (authenticated)|},
    () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("renders post comment form (authenticated)", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("renders delete icon if author of comment (authenticated)", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("renders edit article button (author)", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("renders delete article button (author)", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test(
    "redirect to edit page when click edit article button (author)", () =>
    expect(true) |> toEqual(true)
  );

  Skip.test("invoke delete API when click delete article button (author)", () =>
    expect(true) |> toEqual(true)
  );
});
