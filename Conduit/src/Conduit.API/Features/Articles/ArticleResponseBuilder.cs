using AutoMapper;
using Conduit.API.Infrastructure;

namespace Conduit.API.Features.Articles;

public class ArticleResponseBuilder
{
    private readonly IMapper _mapper;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public ArticleResponseBuilder(IMapper mapper, ICurrentUserAccessor currentUserAccessor)
	{
        _mapper = mapper;
        _currentUserAccessor = currentUserAccessor;
    }

	public ArticleResponse Build(Article article)
	{
        return new ArticleResponse(BuildData(article));
    }

	public PaginatedList<ArticleResponseData> Build(IEnumerable<Article> articles, int total)
	{
        var data = articles.Select(BuildData).ToList();

        return new PaginatedList<ArticleResponseData>(data, total);
    }

    private ArticleResponseData BuildData(Article article)
    {
        var result = _mapper.Map<Article, ArticleResponseData>(article);
        result.Favourited = article.ArticleFavorites.Any(f => f.UserId == _currentUserAccessor.UserId);

        return result;
    }
}
