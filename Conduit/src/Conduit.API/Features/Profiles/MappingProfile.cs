using AutoMapper;
using Conduit.API.Features.Users;

namespace Conduit.API.Features.Profiles;

public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<User, ProfileResponse>()
			.ForCtorParam(nameof(ProfileResponse.Profile), o => o.MapFrom(u => u));
		CreateMap<User, ProfileResponseData>();
	}
}