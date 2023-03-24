using AutoMapper;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class ListQueryHandler : IRequestHandler<ListQuery, PaginatedList<ArticleResponseData>>
{
    private readonly AppDbContext _appDbContext;
    private readonly IMapper _mapper;

    public ListQueryHandler(
        AppDbContext appDbContext, 
        IMapper mapper)
    {
        _appDbContext = appDbContext;
        _mapper = mapper;
    }

    public async Task<PaginatedList<ArticleResponseData>> Handle(ListQuery request, CancellationToken cancellationToken)
    {
        var query = _appDbContext.Articles
            .Include(a => a.Author)
            .AsNoTracking();

        var articles = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip(request.Offset ?? 0)
            .Take(request.Limit ?? 20)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var data = _mapper.Map<List<ArticleResponseData>>(articles);

        return new PaginatedList<ArticleResponseData>(data, query.Count());
    }
}