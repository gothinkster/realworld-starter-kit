using System;

using Conduit.RestAPI.ViewModels;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Conduit.RestAPI.Controllers;

[ApiController]
[Route("articles/{slug}/favorite")]
[Tags("Favorites")]
[Consumes("application/json")]
[Produces("application/json")]
public class FavoritesController : ControllerBase
{
    /// <summary>
    /// Favorite an article
    /// </summary>
    /// <remarks>
    /// Favorite an article. Auth is required<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#favorite-article">Conduit spec for favorite article endpoint</a>
    /// </remarks>
    /// <param name="slug">Slug of the article that you want to favorite</param>
    /// <response code="200">Single article</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpPost]
    [ProducesResponseType<SingleArticleResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult CreateArticleFavorite([FromRoute] string slug)
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
    /// Unfavorite an article
    /// </summary>
    /// <remarks>
    /// Unfavorite an article. Auth is required<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#unfavorite-article">Conduit spec for Unfavorite article</a>
    /// </remarks>
    /// <param name="slug">Slug of the article that you want to unfavorite</param>
    /// <response code="200">Single article</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpDelete]
    [ProducesResponseType<SingleArticleResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult DeleteArticleFavorite([FromRoute] string slug)
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
}