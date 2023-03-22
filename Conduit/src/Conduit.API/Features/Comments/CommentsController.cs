using Conduit.API.Infrastructure.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Conduit.API.Features.Comments;

[Route("api/articles/{slug}")]
[ApiController]
public class CommentsController : ControllerBase
{
    private readonly IMediator _mediator;
    public CommentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("comments")]
    [Authorize(AuthenticationSchemes = JwtIssuerOptions.Schemes)]
    public async Task<IActionResult> Create(string slug, [FromBody] AddPayload payload, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new AddCommand(slug, payload), cancellationToken);
        return CreatedAtAction(nameof(List), new { slug }, result );
    }

    [HttpGet("comments")]
    public async Task<IActionResult> List(string slug, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new ListQuery(slug), cancellationToken);
        return Ok(result);
    }

    [HttpDelete("comments/{id}")]
    [Authorize(AuthenticationSchemes = JwtIssuerOptions.Schemes)]
    public async Task<IActionResult> Delete(string slug, int id, CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteCommand(slug, id), cancellationToken);
        return NoContent();
    }
}
