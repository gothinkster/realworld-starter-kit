using AutoMapper;
using Conduit.API.Features.Profiles;

namespace Conduit.API.Features.Users;

public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<User, UserResponse>()
			.ForCtorParam(nameof(UserResponse.User), o => o.MapFrom(u => u));

		CreateMap<User, UserResponseData>();

		CreateMap<User, ProfileResponseData>();
	}
}
