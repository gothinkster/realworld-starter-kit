using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class FavoriteArticleCommandHandler : IRequestHandler<FavoriteArticleCommand, ArticleResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly ArticleResponseBuilder _articleResponseBuilder;

    public FavoriteArticleCommandHandler(AppDbContext appDbContext, 
        ICurrentUserAccessor currentUserAccessor,
        ArticleResponseBuilder articleResponseBuilder)
	{
        _appDbContext = appDbContext;
        _currentUserAccessor = currentUserAccessor;
        _articleResponseBuilder = articleResponseBuilder;
    }

    public async Task<ArticleResponse> Handle(FavoriteArticleCommand request, CancellationToken cancellationToken)
    {
        var article = await _appDbContext
            .Articles
            .Include(a => a.Author)
            .Include(a => a.ArticleFavorites)
            .FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

        if (article is null)
        {
            throw new ResourceNotFoundException(nameof(Article));
        }

        if (_currentUserAccessor.UserId is null)
        {
            throw new PermissionException();
        }

        var favorite = article.ArticleFavorites.FirstOrDefault(s => s.UserId == _currentUserAccessor.UserId.Value);
        if(favorite is null)
        {
            article.ArticleFavorites.Add(
            new ArticleFavorite
            {
                ArticleId = article.Id,
                UserId = _currentUserAccessor.UserId.Value
            });

            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        return _articleResponseBuilder.Build(article);
    }
}