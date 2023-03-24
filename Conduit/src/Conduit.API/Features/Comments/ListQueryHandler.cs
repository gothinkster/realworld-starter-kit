using AutoMapper;
using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Comments;

public class ListQueryHandler : IRequestHandler<ListQuery, CommentsResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly IMapper _mapper;
    private readonly CommentResponseBuilder _responseBuilder;

    public ListQueryHandler(AppDbContext appDbContext,
        IMapper mapper,
        CommentResponseBuilder responseBuilder)
    {
        _appDbContext = appDbContext;
        _mapper = mapper;
        _responseBuilder = responseBuilder;
    }

    public async Task<CommentsResponse> Handle(ListQuery request, CancellationToken cancellationToken)
    {
        var article = await _appDbContext.Articles
                .Include(a => a.Comments)
                    .ThenInclude(c => c.Author)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

        if (article == null)
        {
            throw new ResourceNotFoundException(nameof(article));
        }

        return _responseBuilder.Build(article.Comments);
    }
}