using AutoMapper;

namespace Conduit.API.Features.Articles;

public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<Article, ArticleResponse>()
			.ForCtorParam(nameof(ArticleResponse.Article), o => o.MapFrom(a => a));

		CreateMap<Article, ArticleResponseData>();	
	}
}
