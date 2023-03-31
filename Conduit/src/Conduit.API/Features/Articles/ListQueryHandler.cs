using AutoMapper;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Conduit.API.Features.Articles;

public class ListQueryHandler : IRequestHandler<ListQuery, PaginatedList<ArticleResponseData>>
{
    private readonly AppDbContext _appDbContext;
    private readonly IMapper _mapper;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public ListQueryHandler(
        AppDbContext appDbContext,
        IMapper mapper,
        ICurrentUserAccessor currentUserAccessor)
    {
        _appDbContext = appDbContext;
        _mapper = mapper;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<PaginatedList<ArticleResponseData>> Handle(ListQuery request, CancellationToken cancellationToken)
    {
        var query = _appDbContext.Articles
            .Include(a => a.Author)
            .AsNoTracking();

        var currentUser = await _appDbContext.Users.Include(x => x.Followings).FirstOrDefaultAsync(x => x.Id == _currentUserAccessor.UserId, cancellationToken);
        if (request.IsFeed && currentUser is not null)
        {
            query = query.Where(x => currentUser.Followings.Select(y => y.Id).Contains(x.Author!.Id));
        }

        if (!string.IsNullOrWhiteSpace(request.Tag))
        {
            query = query.Where(a => a.ArticleTags.Select(t => t.TagId).Contains(request.Tag));
        }

        if (!string.IsNullOrWhiteSpace(request.Author))
        {
            var author = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Username == request.Author, cancellationToken);
            if(author is null)
            {
                return PaginatedList<ArticleResponseData>.Empty;
            }

            query = query.Where(a => a.AuthorId == author.Id);
        }

        if (!string.IsNullOrWhiteSpace(request.FavoritedUsername))
        {
            var author = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Username == request.FavoritedUsername, cancellationToken);
            if(author is null)
            {
                return PaginatedList<ArticleResponseData>.Empty;
            }

            query = query.Where(a => a.ArticleFavorites.Any(f => f.UserId == author.Id));
        }
        

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