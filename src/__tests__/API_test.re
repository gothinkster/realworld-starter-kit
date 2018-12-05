open Jest;
open Expect;
open Belt.Result;
open Js.Promise;

describe("toResult", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("returns Ok if Fetch response ok", () => {
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );

    API.host->(Fetch.fetchWithInit(API.makeFetchInit()))
    |> then_(API.toResult)
    |> then_(actual => {
         let expected = "ok"->Json.Encode.string->Ok;
         actual |> expect |> toEqual(expected) |> resolve;
       });
  });
  testPromise(
    "returns Error if Fetch response is not ok and status is 400", () => {
    JestFetchMock.mockResponse(
      ~body={js|"not ok 400"|js},
      ~status=400,
      ~statusText="400",
      (),
    );

    API.host->(Fetch.fetchWithInit(API.makeFetchInit()))
    |> then_(API.toResult)
    |> then_(actual => {
         let expected = {|"not ok 400"|}->Json.Encode.string->Error;
         actual |> expect |> toEqual(expected) |> resolve;
       });
  });
  testPromise(
    "returns Error if Fetch response is not ok and status is 500", () => {
    JestFetchMock.mockResponse(
      ~body={js|"not ok 500"|js},
      ~status=500,
      ~statusText="500",
      (),
    );

    API.host->(Fetch.fetchWithInit(API.makeFetchInit()))
    |> then_(API.toResult)
    |> then_(actual => {
         let expected = {|"not ok 500"|}->Json.Encode.string->Error;
         actual |> expect |> toEqual(expected) |> resolve;
       });
  });
});

describe("makeFetchInit", () => {
  let origToken = ref(None);

  beforeAll(() => {
    origToken := Utils.getCookie("token");
    ignore();
  });

  afterEach(() => {
    switch (origToken^) {
    | Some(token) => Utils.setCookie("token", token)
    | None => Utils.setCookie("token", "")
    };
    ignore();
  });

  test("no argument", () => {
    let actual = API.makeFetchInit();
    actual |> expect |> toMatchSnapshot;
  });
  test("custom method with POST", () => {
    let actual = API.makeFetchInit(~method_=Post, ());
    actual |> expect |> toMatchSnapshot;
  });
  test("should not include credential", () => {
    let actual = API.makeFetchInit(~includeCookie=false, ());
    actual |> expect |> toMatchSnapshot;
  });
  test("add \"Authorization: Token \" to header", () => {
    Utils.setCookie("token", "@@unit test@@");
    let actual = API.makeFetchInit(~authorization=true, ());
    actual |> expect |> toMatchSnapshot;
  });
  test("add \"Content-Type: application/json; charset=utf-8\" to header", () => {
    let actual = API.makeFetchInit(~jsonContentType=true, ());
    actual |> expect |> toMatchSnapshot;
  });
});

describe("listArticlesFeed", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.listArticlesFeed()
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/feed?limit=20&offset=0",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
  testPromise("limit 5", () =>
    API.listArticlesFeed(~limit=5, ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/feed?limit=5&offset=0",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
  testPromise("offset 10", () =>
    API.listArticlesFeed(~offset=10, ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/feed?limit=20&offset=10",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
});

describe("listArticles", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.listArticles()
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles?limit=20&offset=0",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
  testPromise("all combined", () =>
    API.listArticles(
      ~tag="@tag@",
      ~author="@author@",
      ~favorited="@favorited@",
      ~limit=5,
      ~offset=10,
      (),
    )
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles?limit=5&offset=10&tag=@tag@&author=@author@&favorited=@favorited@",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
  testPromise("tag `@tag@`", () =>
    API.listArticles(~tag="@tag@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles?limit=20&offset=0&tag=@tag@",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
  testPromise("author `@author@`", () =>
    API.listArticles(~author="@author@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles?limit=20&offset=0&author=@author@",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
  testPromise("favorited `@favorited@`", () =>
    API.listArticles(~favorited="@favorited@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles?limit=20&offset=0&favorited=@favorited@",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
  testPromise("limit 5", () =>
    API.listArticles(~limit=5, ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles?limit=5&offset=0",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
  testPromise("offset 10", () =>
    API.listArticles(~offset=10, ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles?limit=20&offset=10",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
});

describe("tags", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.tags()
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/tags",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
});

describe("profiles", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.profiles(~author="@author@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/profiles/@author@",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
});

describe("followUser", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.followUser(~username="@username@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/profiles/@username@/follow",
              "POST",
              "include",
            ))
         |> resolve
       )
  );
});

describe("unfollowUser", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.unfollowUser(~username="@username@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/profiles/@username@/follow",
              "DELETE",
              "include",
            ))
         |> resolve
       )
  );
});

describe("getArticle", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.getArticle(~slug="@slug@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/@slug@",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
});

describe("deleteArticle", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.deleteArticle(~slug="@slug@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/@slug@",
              "DELETE",
              "include",
            ))
         |> resolve
       )
  );
});

describe("favoriteArticle", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.favoriteArticle(~slug="@slug@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/@slug@/favorite",
              "POST",
              "include",
            ))
         |> resolve
       )
  );
});

describe("unfavoriteArticle", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.unfavoriteArticle(~slug="@slug@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/@slug@/favorite",
              "DELETE",
              "include",
            ))
         |> resolve
       )
  );
});

describe("comments", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.comments(~slug="@slug@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/@slug@/comments",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
});

describe("addCommentsToAnArticle", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.addCommentsToAnArticle(~slug="@slug@", ~body="@body@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/@slug@/comments",
              "POST",
              "include",
            ))
         |> resolve
       )
  );
});

describe("deleteComment", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.deleteComment(~slug="@slug@", ~id=12345, ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/@slug@/comments/12345",
              "DELETE",
              "include",
            ))
         |> resolve
       )
  );
});

describe("user", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.user()
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/user",
              "GET",
              "include",
            ))
         |> resolve
       )
  );
});

describe("updateUser", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.updateUser(
      ~email="@email@",
      ~username="@username@",
      ~password="@password@",
      ~image="@image@",
      ~bio="@bio@",
      (),
    )
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/user",
              "PUT",
              "include",
            ))
         |> resolve
       )
  );
});

describe("register", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.register(
      ~email="@email@",
      ~username="@username@",
      ~password="@password@",
      (),
    )
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/users",
              "POST",
              "include",
            ))
         |> resolve
       )
  );
});

describe("login", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.login(~email="@email@", ~password="@password@", ())
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/users/login",
              "POST",
              "include",
            ))
         |> resolve
       )
  );
});

describe("createArticle", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.createArticle(
      ~title="@title@",
      ~description="@description@",
      ~body="@body@",
      ~tagList=["@tag@"],
      (),
    )
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles",
              "POST",
              "include",
            ))
         |> resolve
       )
  );
});

describe("updateArticle", () => {
  beforeEach(() => {
    JestFetchMock.resetMocks();
    JestFetchMock.mockResponse(
      ~body={js|"ok"|js},
      ~status=200,
      ~statusText="200",
      (),
    );
  });

  afterAll(() => {
    JestFetchMock.resetMocks();
    ignore();
  });

  testPromise("default", () =>
    API.updateArticle(
      ~slug="@slug@",
      ~title=Some("@title@"),
      ~description=Some("@description@"),
      ~body=Some("@body@"),
      ~tagList=Some(["@tag@"]),
      (),
    )
    |> then_(_ =>
         (
           JestFetchMock.Mock.calls[0][0],
           JestFetchMock.Mock.calls[0][1]##method_,
           JestFetchMock.Mock.calls[0][1]##credentials,
         )
         |> expect
         |> toEqual((
              "https://conduit.productionready.io/api/articles/@slug@",
              "PUT",
              "include",
            ))
         |> resolve
       )
  );
});
