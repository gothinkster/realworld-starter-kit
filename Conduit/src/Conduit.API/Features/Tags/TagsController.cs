using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Conduit.API.Features.Tags;
[Route("api/[controller]")]
[ApiController]
public class TagsController : ControllerBase
{
    private readonly IMediator _mediator;

    public TagsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new ListQuery(), cancellationToken);

        return Ok(result);
    }
}
