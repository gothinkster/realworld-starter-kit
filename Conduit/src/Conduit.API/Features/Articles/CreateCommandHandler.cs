using Conduit.API.Features.Tags;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class CreateCommandHandler : IRequestHandler<CreateCommand, ArticleResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly ArticleResponseBuilder _responseBuilder;

    public CreateCommandHandler(
        AppDbContext appDbContext,
        ICurrentUserAccessor currentUserAccessor,
        ArticleResponseBuilder responseBuilder)
    {
        _appDbContext = appDbContext;
        _currentUserAccessor = currentUserAccessor;
        _responseBuilder = responseBuilder;
    }

    public async Task<ArticleResponse> Handle(CreateCommand request, CancellationToken cancellationToken)
    {
        var author = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Id == _currentUserAccessor.UserId, cancellationToken);
        var article = new Article
        {
            Title = request.Payload.Article.Title,
            Description = request.Payload.Article.Description,
            Body = request.Payload.Article.Body,
            Slug = request.Payload.Article.Title.GenerateSlug(),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Author = author,
        };

        var tagList = new HashSet<string>(request.Payload.Article.TagList ?? Enumerable.Empty<string>());
        var existingTags = _appDbContext.Tags.Where(t => tagList.Contains(t.Id)).Select(t => t.Id).ToHashSet();
        var tagsToAdd = tagList.Where(t => !existingTags.Contains(t)).ToHashSet();
        foreach (var tag in tagsToAdd)
        {
            _appDbContext.Tags.Add(new Tag { Id = tag });
        }
        await _appDbContext.SaveChangesAsync(cancellationToken);

        foreach (var tag in tagList)
        {
            article.ArticleTags.Add(new ArticleTag { TagId = tag });
        }
        await _appDbContext.Articles.AddAsync(article, cancellationToken);
        await _appDbContext.SaveChangesAsync(cancellationToken);

        return _responseBuilder.Build(article);
    }
}