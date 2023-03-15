using Conduit.API.Infrastructure;
using MediatR;

namespace Conduit.API.Features.Articles;

public class CreateCommandHandler : IRequestHandler<CreateCommand, ArticleResponse>
{
    private readonly AppDbContext _appDbContext;

    public CreateCommandHandler(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<ArticleResponse> Handle(CreateCommand request, CancellationToken cancellationToken)
    {
        var article = new Article
        {
            Title = request.Payload.Article.Title,
            Description = request.Payload.Article.Description,
            Body = request.Payload.Article.Body,
            Slug = request.Payload.Article.Title.GenerateSlug(),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        await _appDbContext.Articles.AddAsync(article, cancellationToken);
        await _appDbContext.SaveChangesAsync(cancellationToken);

        return new ArticleResponse(article);
    }
}