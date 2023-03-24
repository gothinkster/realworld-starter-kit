using AutoMapper;
using Conduit.API.Infrastructure.Auth;

namespace Conduit.API.Features.Users;

public class UserResponseBuilder
{
    private readonly IMapper _mapper;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public UserResponseBuilder(IMapper mapper,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _mapper = mapper;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<UserResponse> BuildAsync(User user, CancellationToken cancellationToken)
    {
        var response = _mapper.Map<UserResponse>(user);
        response.User.Token = await _jwtTokenGenerator.CreateTokenAsync(user.Id, cancellationToken);

        return response;
    }
}
