using AutoMapper;
using Conduit.API.Features.Users;

namespace Conduit.API.Features.Profiles;

public class ProfileResponseBuilder
{
    private readonly IMapper _mapper;

    public ProfileResponseBuilder(IMapper mapper)
    {
        _mapper = mapper;
    }

    public ProfileResponse Build(User user, bool IsFollowing)
    {
        var profile = _mapper.Map<ProfileResponse>(user);
        profile.Profile.Following = IsFollowing;

        return profile;
    }
}
