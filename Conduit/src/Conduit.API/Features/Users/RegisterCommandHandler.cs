using AutoMapper;
using Conduit.API.Infrastructure;
using Conduit.API.Infrastructure.Auth;
using MediatR;

namespace Conduit.API.Features.Users;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, UserResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IMapper _mapper;
    private readonly UserResponseBuilder _responseBuilder;

    public RegisterCommandHandler(
        AppDbContext appDbContext,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator,
        IMapper mapper,
        UserResponseBuilder responseBuilder)
    {
        _appDbContext = appDbContext;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
        _mapper = mapper;
        _responseBuilder = responseBuilder;
    }

    public async Task<UserResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var salt = Guid.NewGuid().ToByteArray();
        var user = new User
        {
            Username = request.Payload.User.Username,
            Email = request.Payload.User.Email,
            Hash = await _passwordHasher.HashAsync(request.Payload.User.Password, salt, cancellationToken),
            Salt = salt,
        };

        await _appDbContext.Users.AddAsync(user, cancellationToken);
        await _appDbContext.SaveChangesAsync(cancellationToken);

        return await _responseBuilder.BuildAsync(user, cancellationToken);
    }
}