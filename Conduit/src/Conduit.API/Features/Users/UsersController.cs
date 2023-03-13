using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conduit.API.Features.Users;
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;
    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody]RegisterPayload payload, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new RegisterCommand(payload), cancellationToken);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginPayload payload, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new LoginCommand(payload), cancellationToken);
        return Ok(result);
    }
}
