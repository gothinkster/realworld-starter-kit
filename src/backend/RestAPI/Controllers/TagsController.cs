using System;

using Conduit.RestAPI.ViewModels;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Swashbuckle.AspNetCore.Annotations;

namespace Conduit.RestAPI.Controllers;

[ApiController]
[Route("tags")]
[Tags("Tags")]
[Consumes("application/json")]
[Produces("application/json")]
public class TagsController : ControllerBase
{
    /// <summary>
    /// Get tags
    /// </summary>
    /// <remarks>
    /// Get tags. Auth not required<br/>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#get-tags">Conduit Spec for get tags endpoint</a>
    /// </remarks>
    /// <response code="200">Tags</response>
    /// <response code="422">Unexpected error</response>
    [HttpGet]
    [ProducesResponseType<TagsResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult GetArticlesFeed()
    {
        return Ok(
            new TagsResponse
            {
                Tags = new[] { "tag1", "tag2" }
            });
    }
}