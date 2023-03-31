using Conduit.API.Infrastructure.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
    public async Task<IActionResult> Get(
        [FromQuery] string tag, 
        [FromQuery] string author, 
        [FromQuery] string favorited, 
        [FromQuery] int? limit, 
        [FromQuery] int? offset, 
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new ListQuery(tag, author, favorited, limit, offset), cancellationToken);
        return Ok(result);
    }

    [HttpGet("feed")]
    public async Task<IActionResult> Feed(
        [FromQuery] string tag,
        [FromQuery] string author,
        [FromQuery] string favorited,
        [FromQuery] int? limit,
        [FromQuery] int? offset,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new ListQuery(tag, author, favorited, limit, offset) { IsFeed = true}, cancellationToken);
        return Ok(result);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> Get(string slug, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetQuery(slug), cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtIssuerOptions.Schemes)]
    public async Task<IActionResult> Create([FromBody] CreatePayload payload, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new CreateCommand(payload), cancellationToken);
        var routes = new { result.Article.Slug };
        return CreatedAtAction(nameof(Get), routes, result);
    }

    [HttpPut("{slug}")]
    [Authorize(AuthenticationSchemes = JwtIssuerOptions.Schemes)]
    public async Task<IActionResult> Update(string slug, [FromBody] UpdatePayload payload, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new UpdateCommand(slug, payload), cancellationToken);
        return Ok(result);
    }

    [HttpDelete("{slug}")]
    [Authorize(AuthenticationSchemes = JwtIssuerOptions.Schemes)]
    public async Task<IActionResult> Delete(string slug, CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteCommand(slug), cancellationToken);
        return NoContent();
    }

    [HttpPost("{slug}/favorite")]
    [Authorize(AuthenticationSchemes = JwtIssuerOptions.Schemes)]
    public async Task<IActionResult> Favorite(string slug, CancellationToken cancellationToken)
    {
        var result =  await _mediator.Send(new FavoriteArticleCommand(slug), cancellationToken);
        return Ok(result);
    }

    [HttpDelete("{slug}/favorite")]
    [Authorize(AuthenticationSchemes = JwtIssuerOptions.Schemes)]
    public async Task<IActionResult> Unfavorite(string slug, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new UnfavoriteArticleCommand(slug), cancellationToken);
        return Ok(result);
    }
}
