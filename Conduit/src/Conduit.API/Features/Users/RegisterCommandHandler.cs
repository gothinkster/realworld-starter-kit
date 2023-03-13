using Conduit.API.Infrastructure;
using Conduit.API.Infrastructure.Auth;
using MediatR;

namespace Conduit.API.Features.Users;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, UserDTO>
{
    private readonly AppDbContext _appDbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RegisterCommandHandler(
        AppDbContext appDbContext,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _appDbContext = appDbContext;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<UserDTO> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var salt = Guid.NewGuid().ToByteArray();
        var user = new User
        {
            Username = request.Payload.Username,
            Email = request.Payload.Email,
            Hash = await _passwordHasher.HashAsync(request.Payload.Password, salt, cancellationToken),
            Salt = salt,
        };

        await _appDbContext.Users.AddAsync(user, cancellationToken);
        await _appDbContext.SaveChangesAsync(cancellationToken);

        return new UserDTO
        {
            UserName = user.Username,
            Email = user.Email,
            Bio = user.Bio,
            Image = user.Image,
            Token = await _jwtTokenGenerator.CreateTokenAsync(user.Id, cancellationToken)
        };
    }
}