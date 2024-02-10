using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Users.Queries.Login;
using Conduit.RestAPI.ViewModels;
using CSharpFunctionalExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Conduit.RestAPI.Controllers;

[ApiController]
[Route("users")]
[Tags("User and Authentication")]
[Consumes("application/json")]
[Produces("application/json")]
public class AuthenticationController : ControllerBase
{
    readonly IMediator _mediator;

    public AuthenticationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Existing user login
    /// </summary>
    /// <remarks>
    /// Login for existing user<br/><a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#authentication">Conduit Spec for login endpoint</a>
    /// </remarks>
    /// <param name="request">Credentials to use</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    /// <response code="200">User</response>
    /// <response code="401">Unauthorized</response>
    [HttpPost("login")]
    [ProducesResponseType<UserResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> Login([FromBody, SwaggerRequestBody(Required = true)] LoginUserRequest request, CancellationToken cancellationToken)
    {
        return await _mediator.Send(new LoginQuery
        {
            Email = request.User.Email,
            Password = request.User.Password
        }, cancellationToken)
            .Match(
                onSuccess: (user) => (IActionResult)Ok(
                    new UserResponse
                    {
                        User = new User
                        {
                            Email = user.Email,
                            Username = user.Username,
                            Token = user.Token,
                            Bio = user.Bio,
                            Image = user.Image
                        }
                    }),
                onFailure: (error) => UnprocessableEntity(
                    new GenericErrorModel
                    {
                        Errors = new()
                        {
                            Body = error.Messages.Select(m => m.Message).ToArray()
                        }
                    }));
    }
}
