using AutoMapper;
using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class GetQueryHandler : IRequestHandler<GetQuery, ArticleResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly ArticleResponseBuilder _responseBuilder;

    public GetQueryHandler(AppDbContext appDbContext, IMapper mapper, ArticleResponseBuilder responseBuilder)
    {
        _appDbContext = appDbContext;
        _responseBuilder = responseBuilder;
    }

    public async Task<ArticleResponse> Handle(GetQuery request, CancellationToken cancellationToken)
    {
       var article = await _appDbContext
            .Articles
            .FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

        if(article is null)
        {
            throw new ResourceNotFoundException(nameof(Article));
        }

        return _responseBuilder.Build(article);
    }
}