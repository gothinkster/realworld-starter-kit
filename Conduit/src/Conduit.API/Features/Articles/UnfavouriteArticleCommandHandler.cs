using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class UnfavouriteArticleCommandHandler : IRequestHandler<UnfavoriteArticleCommand, ArticleResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly ArticleResponseBuilder _articleResponseBuilder;

    public UnfavouriteArticleCommandHandler(
		AppDbContext appDbContext,
        ICurrentUserAccessor currentUserAccessor,
        ArticleResponseBuilder articleResponseBuilder)
	{
        _appDbContext = appDbContext;
        _currentUserAccessor = currentUserAccessor;
        _articleResponseBuilder = articleResponseBuilder;
    }

    public async Task<ArticleResponse> Handle(UnfavoriteArticleCommand request, CancellationToken cancellationToken)
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
        if (favorite is not null)
        {
            article.ArticleFavorites.Remove(favorite);

            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        return _articleResponseBuilder.Build(article);
    }
}
