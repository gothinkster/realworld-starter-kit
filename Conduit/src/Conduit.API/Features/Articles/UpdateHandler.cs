using AutoMapper;
using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class UpdateHandler : IRequestHandler<UpdateCommand, ArticleResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly ArticleResponseBuilder _responseBuilder;

    public UpdateHandler(AppDbContext appDbContext,
        ICurrentUserAccessor currentUserAccessor,
        ArticleResponseBuilder responseBuilder)
    {
        _appDbContext = appDbContext;
        _currentUserAccessor = currentUserAccessor;
        _responseBuilder = responseBuilder;
    }

    public async Task<ArticleResponse> Handle(UpdateCommand request, CancellationToken cancellationToken)
    {
        var article = await _appDbContext.Articles
            .FirstOrDefaultAsync(a => a.Slug == request.Slug, cancellationToken);

        if(article is null)
        {
            throw new ResourceNotFoundException(nameof(Article));
        }

        if(article.AuthorId != _currentUserAccessor.GetCurrentUserId())
        {
            throw new PermissionException();
        }

        article.Title = request.Payload.Article.Title ?? article.Title;
        article.Description = request.Payload.Article.Description ?? article.Description;
        article.Body = request.Payload.Article.Body ?? article.Body;
        article.Slug = article.Title.GenerateSlug();
        article.UpdatedAt = DateTime.UtcNow;

        await _appDbContext.SaveChangesAsync(cancellationToken);

        return _responseBuilder.Build(article);
    }
}


