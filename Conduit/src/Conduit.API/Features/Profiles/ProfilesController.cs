using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Conduit.API.Features.Profiles;
[Route("api/profiles/{username}")]
[ApiController]
public class ProfilesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProfilesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [AllowAnonymous]
    public async Task<IActionResult> Get(string username, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetQuery(username), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Follow(string username, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new FollowCommand(username), cancellationToken);
        return Ok(result);
    }

    [HttpDelete]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Unfollow(string username, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new UnfollowCommand(username), cancellationToken);
        return Ok(result);
    }
}
