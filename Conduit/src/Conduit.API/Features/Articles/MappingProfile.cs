using AutoMapper;

namespace Conduit.API.Features.Articles;

public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<Article, ArticleResponseData>()
			.ForMember(a => a.FavouritesCount, 
				o => o.MapFrom(a => a.ArticleFavorites.Count))
			.ForMember(a => a.TagList, 
				o => o.MapFrom(a => a.ArticleTags.Select(t => t.TagId)));	
	}
}
