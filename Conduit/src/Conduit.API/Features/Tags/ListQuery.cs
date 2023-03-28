using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Tags;

public record ListQuery : IRequest<TagResponse>;

public record TagResponse(IEnumerable<string> Tags);

public class ListQueryHandler : IRequestHandler<ListQuery, TagResponse>
{
    private readonly AppDbContext _appDbContext;

    public ListQueryHandler(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }
    public async Task<TagResponse> Handle(ListQuery request, CancellationToken cancellationToken)
    {
        var tags = await _appDbContext.Tags.Select(t => t.Id).ToListAsync(cancellationToken);

        return new TagResponse(tags);
    }
}