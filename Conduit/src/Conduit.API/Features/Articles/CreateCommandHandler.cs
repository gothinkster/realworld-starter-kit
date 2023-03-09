using Conduit.API.Common.Extensions;
using Conduit.API.Infrastructure;
using MediatR;

namespace Conduit.API.Features.Articles;

public class CreateCommandHandler : IRequestHandler<CreateCommand, Article>
{
    private readonly AppDbContext _appDbContext;

    public CreateCommandHandler(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<Article> Handle(CreateCommand request, CancellationToken cancellationToken)
    {
        var article = new Article
        {
            Title = request.Payload.Title,
            Description = request.Payload.Description,
            Body = request.Payload.Body,
            Slug = request.Payload.Title.GenerateSlug(),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        await _appDbContext.Articles.AddAsync(article, cancellationToken);
        await _appDbContext.SaveChangesAsync(cancellationToken);

        return article;
    }
}