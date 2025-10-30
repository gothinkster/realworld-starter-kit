using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using RealWorldAspire.ApiService.Data.Models;
using RealWorldAspire.ApiService.Features.Articles;
using Shouldly;
using RealWorldAspire.ApiService.Tests.TestUtilities;

namespace RealWorldAspire.ApiService.Tests.Features.Articles.ArticleHandlersTests;

[Collection(nameof(PostgresDatabaseCollection))]
public class GetArticles : HandlerTestBase, IAsyncLifetime
{
    private readonly ClaimsPrincipal _principal;
    private readonly string _connectionString;

    public GetArticles(PostgresTestFixture fixture)
    {
        _connectionString = fixture.Postgres.GetConnectionString();
        _principal = new ClaimsPrincipal();
    }

    public async Task InitializeAsync()
    {
        using var context = ScopedContext.Create(_connectionString);

        var author1 = new AppUser()
        {
            Email = "articles-author@example.com",
            UserName = "ArticlesAuthor",
            Bio = "Prolific writer",
            Image = "https://example.com/author.jpg",
        };
        await context.UserManager.CreateAsync(author1);

        var author2 = new AppUser()
        {
            Email = "second-author@example.com",
            UserName = "SecondAuthor",
            Bio = "Another writer",
            Image = "https://example.com/author2.jpg",
        };
        await context.UserManager.CreateAsync(author2);

        var favoritingUser = new AppUser()
        {
            Email = "favoriter@example.com",
            UserName = "FavoritingUser",
            Bio = "Loves articles",
            Image = "https://example.com/favoriter.jpg",
        };
        await context.UserManager.CreateAsync(favoritingUser);

        var articles = GetFakeArticles(author1, author2);

        // Add favoriting user to articles 14-16 (indices 13-15)
        favoritingUser = (await context.UserManager.FindByEmailAsync(favoritingUser.Email))!;
        articles[13].FavoritedByUsers.Add(favoritingUser);
        articles[14].FavoritedByUsers.Add(favoritingUser);
        articles[15].FavoritedByUsers.Add(favoritingUser);

        await context.DbContext.AddRangeAsync(articles);
        await context.DbContext.SaveChangesAsync();
    }

    public Task DisposeAsync() => Task.CompletedTask;

    [Fact]
    public async Task Should_Return_10_First_Articles()
    {
        // Arrange
        var request = new GetArticlesRequest()
        {
            Limit = 10,
        };

        // Act
        var result = await ScopedContext.Execute(_connectionString, async (dbContext, userManager) =>
            await ArticleHandlers.GetArticles(request, _principal, userManager, dbContext)
        );

        // Assert
        result.ShouldBeOfType<Ok<GetArticlesResponse>>();
        var okResult = result as Ok<GetArticlesResponse>;
        okResult.ShouldNotBeNull();
        var returnedArticles = okResult.Value?.Articles;
        var countResult = okResult.Value?.ArticlesCount;

        returnedArticles.ShouldNotBeNull().Count.ShouldBe(10);
        countResult.ShouldBe(20); // Total count of all articles
    }

    [Fact]
    public async Task Should_Return_3_Articles_By_Tag()
    {
        // Arrange
        var request = new GetArticlesRequest()
        {
            Tag = "javascript",
        };

        // Act
        var result = await ScopedContext.Execute(_connectionString, async (dbContext, userManager) =>
            await ArticleHandlers.GetArticles(request, _principal, userManager, dbContext)
        );

        // Assert
        result.ShouldBeOfType<Ok<GetArticlesResponse>>();
        var okResult = result as Ok<GetArticlesResponse>;
        okResult.ShouldNotBeNull();
        var returnedArticles = okResult.Value?.Articles;
        var countResult = okResult.Value?.ArticlesCount;

        returnedArticles.ShouldNotBeNull().Count.ShouldBe(3);
        countResult.ShouldBe(3);

        // Verify all returned articles have the "javascript" tag
        foreach (var article in returnedArticles)
        {
            article.TagList.ShouldContain("javascript");
        }
    }

    [Fact]
    public async Task Should_Return_3_Articles_By_Author()
    {
        // Arrange
        var request = new GetArticlesRequest()
        {
            Author = "SecondAuthor",
        };

        // Act
        var result = await ScopedContext.Execute(_connectionString, async (dbContext, userManager) =>
            await ArticleHandlers.GetArticles(request, _principal, userManager, dbContext)
        );

        // Assert
        result.ShouldBeOfType<Ok<GetArticlesResponse>>();
        var okResult = result as Ok<GetArticlesResponse>;
        okResult.ShouldNotBeNull();
        var returnedArticles = okResult.Value?.Articles;
        var countResult = okResult.Value?.ArticlesCount;

        returnedArticles.ShouldNotBeNull().Count.ShouldBe(3);
        countResult.ShouldBe(3);

        // Verify all returned articles are by "SecondAuthor"
        foreach (var article in returnedArticles)
        {
            article.Author.Username.ShouldBe("SecondAuthor");
        }
    }

    [Fact]
    public async Task Should_Return_3_Articles_By_Favorited()
    {
        // Arrange
        var request = new GetArticlesRequest()
        {
            Favorited = "FavoritingUser",
        };

        // Act
        var result = await ScopedContext.Execute(_connectionString, async (dbContext, userManager) =>
            await ArticleHandlers.GetArticles(request, _principal, userManager, dbContext)
        );

        // Assert
        result.ShouldBeOfType<Ok<GetArticlesResponse>>();
        var okResult = result as Ok<GetArticlesResponse>;
        okResult.ShouldNotBeNull();
        var returnedArticles = okResult.Value?.Articles;
        var countResult = okResult.Value?.ArticlesCount;

        returnedArticles.ShouldNotBeNull().Count.ShouldBe(3);
        countResult.ShouldBe(3);

        // Verify returned articles are the ones favorited by FavoritingUser (articles 14-16)
        var expectedSlugs = new[] { "article-14", "article-15", "article-16" };
        var returnedSlugs = returnedArticles.Select(a => a.Slug).ToList();
        returnedSlugs.ShouldBeSubsetOf(expectedSlugs);
        returnedSlugs.Count.ShouldBe(3);
    }

    private List<Article> GetFakeArticles(AppUser author1, AppUser author2)
    {
        var articles = new List<Article>();

        // Create 20 articles
        for (int i = 1; i <= 20; i++)
        {
            articles.Add(new Article
            {
                Slug = $"article-{i}",
                Title = $"Article {i}",
                Description = $"Description for article {i}",
                Body = $"Body content for article {i}",
                CreatedAt = new DateTime(2025, 10, 1, 0, 0, 0, DateTimeKind.Utc).AddDays(i),
                UpdatedAt = new DateTime(2025, 10, 1, 0, 0, 0, DateTimeKind.Utc).AddDays(i),
                FavoritedByUsers = [],
                Tags = [],
                Author = author1,
            });
        }

        // Assign articles 11-13 to second author
        articles[10].Author = author2;
        articles[11].Author = author2;
        articles[12].Author = author2;

        // Add tags to specific articles
        articles[0].Tags.Add(new Tag { Name = "javascript" });
        articles[1].Tags.Add(new Tag { Name = "javascript" });
        articles[2].Tags.Add(new Tag { Name = "javascript" });

        articles[3].Tags.Add(new Tag { Name = "csharp" });
        articles[4].Tags.Add(new Tag { Name = "csharp" });
        articles[5].Tags.Add(new Tag { Name = "csharp" });

        articles[6].Tags.Add(new Tag { Name = "testing" });
        articles[7].Tags.Add(new Tag { Name = "testing" });
        articles[8].Tags.Add(new Tag { Name = "testing" });

        return articles;
    }
}