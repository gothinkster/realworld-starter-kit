using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Users.Commands.RegisterNewUser;
using Conduit.Application.Users.Commands.UpdateUser;
using Conduit.Application.Users.Queries.CurrentUser;
using Conduit.RestAPI.ViewModels;
using CSharpFunctionalExtensions;
using CSharpFunctionalExtensions.ValueTasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Conduit.RestAPI.Controllers;

[ApiController]
[Route("users")]
[Tags("User and Authentication")]
[Consumes("application/json")]
[Produces("application/json")]
public class UsersController : ControllerBase
{
    readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Register a new user
    /// </summary>
    /// <remarks>
    /// <a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/#registration">Conduit Spec for registration endpoint</a>
    /// </remarks>
    /// <param name="request">Details of the new user to register</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    /// <response code="201">User</response>
    /// <response code="422">Unexpected error</response>
    [HttpPost]
    [ProducesResponseType<UserResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<GenericErrorModel>(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> CreateUser([FromBody, SwaggerRequestBody(Required = true)] NewUserRequest request, CancellationToken cancellationToken)
    {
        return await _mediator.Send(new RegisterNewUserCommand
        {
            Email = request.User.Email,
            Username = request.User.Username,
            Password = request.User.Password
        }, cancellationToken)
            .Match(
                onSuccess: (newUser) => (IActionResult)Created(
                    (string?)null,
                    new UserResponse
                    {
                        User = new User
                        {
                            Email = newUser.Email,
                            Username = newUser.Username,
                            Token = newUser.Token,
                            Bio = newUser.Bio,
                            Image = newUser.Image
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

    /// <summary>
    /// Get current user
    /// </summary>
    /// <remarks>
    /// Gets the currently logged-in user<br/><a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#get-current-user">Conduit spec for Get Current User endpoint</a>
    /// </remarks>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    /// <response code="200">User</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [Authorize]
    [HttpGet("/user")]
    [ProducesResponseType<UserResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> GetCurrentUser(CancellationToken cancellationToken)
    {
        return await _mediator.Send(new CurrentUserQuery { }, cancellationToken)
            .Match(
                onSuccess: (newUser) => (IActionResult)Ok(
                    new UserResponse
                    {
                        User = new User
                        {
                            Email = newUser.Email,
                            Username = newUser.Username,
                            Token = newUser.Token,
                            Bio = newUser.Bio,
                            Image = newUser.Image
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

    /// <summary>
    /// Update current user
    /// </summary>
    /// <remarks>
    /// Updated user information for current user<br/><a href="https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#update-user">Conduit spec for Update User</a>
    /// </remarks>
    /// <param name="request">User details to update. At least **one** field is required.</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    /// <response code="200">User</response>
    /// <response code="401">Unauthorized</response>
    /// <response code="422">Unexpected error</response>
    [HttpPut("/user")]
    [ProducesResponseType<UserResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> UpdateCurrentUser([FromBody, SwaggerRequestBody(Required = true)] UpdateUserRequest request, CancellationToken cancellationToken)
    {
        return await _mediator.Send(new UpdateUserCommand
        {
            Email = request.User.Email,
            Username = request.User.Username,
            Password = request.User.Password,
            Bio = request.User.Bio,
            Image = request.User.Image
        }, cancellationToken)
            .Match(
                onSuccess: (newUser) => (IActionResult)Ok(
                    new UserResponse
                    {
                        User = new User
                        {
                            Email = newUser.Email,
                            Username = newUser.Username,
                            Token = newUser.Token,
                            Bio = newUser.Bio,
                            Image = newUser.Image
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
