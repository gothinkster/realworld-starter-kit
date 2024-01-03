using System;

using Conduit.RestAPI.ViewModels;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Swashbuckle.AspNetCore.Annotations;

namespace Conduit.RestAPI.Controllers;

[ApiController]
[Route("articles")]
[Tags("Articles")]
[Consumes("application/json")]
[Produces("application/json")]
public sealed class ArticlesController : ControllerBase
{
    /// <summary>
    /// Get recent articles from users you follow
    /// </summary>
    /// <remarks>
    /// Get most recent articles from users you follow. Use query parameters to limit. Auth is required<br/><a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#registration">Conduit Spec for registration endpoint</a>
    /// </remarks>
    /// <param name="filter">Filtering options</param>
    /// <response code="200">Multiple articles</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpGet("feed")]
    [ProducesResponseType<MultipleArticlesResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult GetArticlesFeed([FromQuery] GetArticlesFeedRequest filter)
    {
        return Ok(
            new MultipleArticlesResponse
            {
                ArticlesCount = 1,
                Articles = new[]
                {
                    new Article
                    {
                        Slug = "slug",
                        Title = "title",
                        Description = "description",
                        Body = "body",
                        tagList = new[] { "Test" },
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Favorited = true,
                        FavoritesCount = 3,
                        Author = new Profile
                        {
                            Username = "username",
                            Bio = "bio",
                            Image = "image",
                            Following = false
                        }
                    }
                }
            });
    }

    /// <summary>
    /// Get recent articles globally
    /// </summary>
    /// <remarks>
    /// Get most recent articles globally. Use query parameters to filter results. Auth is optional<br/><a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#list-articles">Conduit spec for List Articles Endpoint</a>
    /// </remarks>
    /// <param name="filter">Filtering options</param>
    /// <response code="200">Multiple articles</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpGet]
    [ProducesResponseType<MultipleArticlesResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    //public IActionResult GetArticles(string? tag, string? author, string? favorited, [Range(0, double.PositiveInfinity)] uint offset = 0, [Range(1, double.PositiveInfinity)] uint limit = 20)
    public IActionResult GetArticles([FromQuery] GetArticlesRequest filter)
    {
        return Ok(
            new MultipleArticlesResponse
            {
                ArticlesCount = 1,
                Articles = new[]
                {
                    new Article
                    {
                        Slug = "slug",
                        Title = "title",
                        Description = "description",
                        Body = "body",
                        tagList = new[] { "Test" },
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Favorited = true,
                        FavoritesCount = 3,
                        Author = new Profile
                        {
                            Username = "username",
                            Bio = "bio",
                            Image = "image",
                            Following = false
                        }
                    }
                }
            });
    }

    /// <summary>
    /// Create an article
    /// </summary>
    /// <remarks>
    /// Create an article. Auth is required<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#create-article">Conduit Spec for create article endpoint</a>
    /// </remarks>
    /// <param name="request">Article to create</param>
    /// <response code="201">Single article</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpPost]
    [ProducesResponseType<SingleArticleResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult CreateArticle([FromBody, SwaggerRequestBody(Required = true)] NewArticleRequest request)
    {
        return Ok(
            new SingleArticleResponse
            {
                Article = new Article
                {
                    Slug = "slug",
                    Title = "title",
                    Description = "description",
                    Body = "body",
                    tagList = new[] { "Test" },
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Favorited = true,
                    FavoritesCount = 3,
                    Author = new Profile
                    {
                        Username = "username",
                        Bio = "bio",
                        Image = "image",
                        Following = false
                    }
                }
            });
    }

    /// <summary>
    /// Get an article
    /// </summary>
    /// <remarks>
    /// Get an article. Auth not required<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#get-article">Conduit spec for Get Article endpoint</a>
    /// </remarks>
    /// <param name="slug">Slug of the article to get</param>
    /// <response code="200">Single article</response>
    /// <response code="422">Unexpected error</response>
    [HttpGet("{slug}")]
    [ProducesResponseType<SingleArticleResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult GetArticle([FromRoute] string slug)
    {
        return Ok(
            new SingleArticleResponse
            {
                Article = new Article
                {
                    Slug = "slug",
                    Title = "title",
                    Description = "description",
                    Body = "body",
                    tagList = new[] { "Test" },
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Favorited = true,
                    FavoritesCount = 3,
                    Author = new Profile
                    {
                        Username = "username",
                        Bio = "bio",
                        Image = "image",
                        Following = false
                    }
                }
            });
    }

    /// <summary>
    /// Update an article
    /// </summary>
    /// <remarks>
    /// Update an article. Auth is required<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#update-article">Conduit spec for Update Article endpoint</a>
    /// </remarks>
    /// <param name="request">Comment you want to create</param>
    /// <param name="slug">Slug of the article to update</param>
    /// <response code="200">Single article</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpPut("{slug}")]
    [ProducesResponseType<SingleArticleResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult UpdateArticle([FromBody, SwaggerRequestBody(Required = true)] UpdateArticleRequest request, [FromRoute] string slug)
    {
        return Ok(
            new SingleArticleResponse
            {
                Article = new Article
                {
                    Slug = "slug",
                    Title = "title",
                    Description = "description",
                    Body = "body",
                    tagList = new[] { "Test" },
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Favorited = true,
                    FavoritesCount = 3,
                    Author = new Profile
                    {
                        Username = "username",
                        Bio = "bio",
                        Image = "image",
                        Following = false
                    }
                }
            });
    }

    /// <summary>
    /// Delete an article
    /// </summary>
    /// <remarks>
    /// Delete an article. Auth is required<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#delete-article">Conduit spec for Delete Article endpoint</a>
    /// </remarks>
    /// <param name="slug">Slug of the article to delete</param>
    /// <response code="200">No Content</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpDelete("{slug}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult DeleteArticle([FromRoute] string slug)
    {
        return Ok();
    }
}