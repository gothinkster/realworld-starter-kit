using Conduit.RestAPI.ViewModels;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Conduit.RestAPI.Controllers;

[ApiController]
[Route("profiles")]
[Tags("Profile")]
[Consumes("application/json")]
[Produces("application/json")]
public class ProfilesController : ControllerBase
{
    /// <summary>
    /// Get a profile
    /// </summary>
    /// <remarks>
    /// Get a profile of a user of the system. Auth is optional<br/><a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#get-profile">Conduit spec for Get Profile</a>
    /// </remarks>
    /// <param name="username">Username of the profile to get</param>
    /// <returns></returns>
    /// <response code="200">Profile</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpGet("{username}")]
    [ProducesResponseType<ProfileResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult GetProfileByUsername([FromRoute] string username)
    {
        return Ok(
            new ProfileResponse
            {
                Profile = new Profile
                {
                    Username = "name",
                    Bio = "Test Bio",
                    Image = "Test",
                    Following = false
                }
            });
    }

    /// <summary>
    /// Follow a user
    /// </summary>
    /// <remarks>
    /// Follow a user by username<br/><a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#follow-user">Conduit Spec for follow user endpoint</a>
    /// </remarks>
    /// <param name="username">Username of the profile you want to follow</param>
    /// <returns></returns>
    /// <response code="200">Profile</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpPost("{username}/follow")]
    [ProducesResponseType<ProfileResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult FollowUserByUsername([FromRoute] string username)
    {
        return Ok(
            new ProfileResponse
            {
                Profile = new Profile
                {
                    Username = "name",
                    Bio = "Test Bio",
                    Image = "Test",
                    Following = false
                }
            });
    }

    /// <summary>
    /// Unfollow a user
    /// </summary>
    /// <remarks>
    /// Unfollow a user by username<br/><a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#unfollow-user">Conduit Spec for unfollow user endpoint</a>
    /// </remarks>
    /// <param name="username">Username of the profile you want to unfollow</param>
    /// <returns></returns>
    /// <response code="200">Profile</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpDelete("{username}/follow")]
    [ProducesResponseType<ProfileResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public IActionResult UnfollowUserByUsername([FromRoute] string username)
    {
        return Ok(
            new ProfileResponse
            {
                Profile = new Profile
                {
                    Username = "name",
                    Bio = "Test Bio",
                    Image = "Test",
                    Following = false
                }
            });
    }
}