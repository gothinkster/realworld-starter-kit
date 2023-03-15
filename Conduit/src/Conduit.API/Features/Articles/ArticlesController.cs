using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conduit.API.Features.Articles;

[Route("api/[controller]")]
[ApiController]
public class ArticlesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ArticlesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int? limit, [FromQuery] int? offset, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new ListQuery(limit, offset), cancellationToken);
        return Ok(result);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> Get(string slug, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetQuery(slug), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePayload payload, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new CreateCommand(payload), cancellationToken);
        var routes = new { result.Article.Slug };
        return CreatedAtAction(nameof(Get), routes, result);
    }

    [HttpPut("{slug}")]
    public async Task<IActionResult> Update(string slug, [FromBody] UpdatePayload payload, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new UpdateCommand(slug, payload), cancellationToken);
        return Ok(result);
    }

    [HttpDelete("{slug}")]
    public async Task<IActionResult> Delete(string slug, CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteCommand(slug), cancellationToken);
        return NoContent();
    }
}
