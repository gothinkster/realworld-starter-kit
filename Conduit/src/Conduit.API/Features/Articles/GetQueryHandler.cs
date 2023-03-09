using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class GetQueryHandler : IRequestHandler<GetQuery, Article?>
{
    private readonly AppDbContext _appDbContext;

    public GetQueryHandler(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<Article?> Handle(GetQuery request, CancellationToken cancellationToken)
    {
       var article = await _appDbContext
            .Articles
            .FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

        return article;
    }
}