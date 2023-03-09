using Conduit.API.Common.Extensions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class UpdateHandler : IRequestHandler<UpdateCommand, Article>
{
    private readonly AppDbContext _appDbContext;

    public UpdateHandler(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<Article> Handle(UpdateCommand request, CancellationToken cancellationToken)
    {
        var article = await _appDbContext
            .Articles
            .FirstOrDefaultAsync(a => a.Slug == request.Slug, cancellationToken);

        if(article is null)
        {
            throw new ArgumentException("Article not found.");
        }

        article.Title = request.Payload.Title ?? article.Title;
        article.Description = request.Payload.Description ?? article.Description;
        article.Body = request.Payload.Body ?? article.Body;
        article.Slug = article.Title.GenerateSlug();
        article.UpdatedAt = DateTime.UtcNow;

        await _appDbContext.SaveChangesAsync(cancellationToken);

        return article;
    }
}


