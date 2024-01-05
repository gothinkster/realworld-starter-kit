using System;
using Conduit.RestAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Conduit.RestAPI.Controllers;

[ApiController]
[Route("articles/{slug}/comments")]
[Tags("Comments")]
[Consumes("application/json")]
[Produces("application/json")]
public class CommentsController : ControllerBase
{
    /// <summary>
    /// Get comments for an article
    /// </summary>
    /// <remarks>
    /// Get the comments for an article. Auth is optional<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#get-comments-from-an-article">Conduit spec for Get All Comments for and Article</a>
    /// </remarks>
    /// <param name="slug">Slug of the article that you want to get comments for</param>
    /// <response code="200">Multiple comments</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpGet]
    [ProducesResponseType<MultipleCommentsResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult GetArticleComments([FromRoute] string slug)
    {
        return Ok(
            new MultipleCommentsResponse
            {
                Comments = new[]
                {
                    new Comment
                    {
                        Id = 0,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Body = "body",
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
    /// Create a comment for an article
    /// </summary>
    /// <remarks>
    /// Create a comment for an article. Auth is required<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#add-comments-to-an-article">Conduit spec for Add Comments to an Article</a>
    /// </remarks>
    /// <param name="request">Comment you want to create</param>
    /// <param name="slug">Slug of the article that you want to create a comment for</param>
    /// <response code="200">Single comment</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpPost]
    [ProducesResponseType<SingleCommentResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult CreateArticleComment([FromBody, SwaggerRequestBody(Required = true)] NewCommentRequest request, [FromRoute] string slug)
    {
        return Ok(
            new SingleCommentResponse
            {
                Comment = new Comment
                {
                    Id = 0,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Body = "body",
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
    /// Delete a comment for an article
    /// </summary>
    /// <remarks>
    /// Delete a comment for an article. Auth is required<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#delete-comment">Conduit spec for Delete Comment to an Article</a>
    /// </remarks>
    /// <param name="slug">Slug of the article that you want to delete a comment for</param>
    /// <param name="id">ID of the comment you want to delete</param>
    /// <response code="200">No Content</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult DeleteArticleComment([FromRoute] string slug, [FromRoute] int id)
    {
        return Ok();
    }
}
