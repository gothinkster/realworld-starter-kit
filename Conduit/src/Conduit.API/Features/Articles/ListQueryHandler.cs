using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class ListQueryHandler : IRequestHandler<ListQuery, PaginatedList<Article>>
{
    private readonly AppDbContext _appDbContext;

    public ListQueryHandler(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<PaginatedList<Article>> Handle(ListQuery request, CancellationToken cancellationToken)
    {
        var query = _appDbContext.Articles.AsNoTracking();

        var articles = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip(request.Offset ?? 0)
            .Take(request.Limit ?? 20)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return new PaginatedList<Article>(articles, query.Count());
    }
}