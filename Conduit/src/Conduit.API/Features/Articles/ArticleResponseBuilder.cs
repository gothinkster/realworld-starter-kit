using AutoMapper;
using Conduit.API.Infrastructure;

namespace Conduit.API.Features.Articles;

public class ArticleResponseBuilder
{
    private readonly IMapper _mapper;

    public ArticleResponseBuilder(IMapper mapper)
	{
        _mapper = mapper;
    }

	public ArticleResponse Build(Article article)
	{
        var response = _mapper.Map<ArticleResponse>(article);
        return _mapper.Map<ArticleResponse>(article);
	}

	public PaginatedList<ArticleResponseData> Build(IEnumerable<Article> articles, int total)
	{
        var data = _mapper.Map<List<ArticleResponseData>>(articles);

        return new PaginatedList<ArticleResponseData>(data, total);
    }
}
