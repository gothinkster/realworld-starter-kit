using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using Conduit.API.Infrastructure.Auth;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Users;

public class LoginCommandHandler : IRequestHandler<LoginCommand, UserDTO>
{
    private readonly AppDbContext _dbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginCommandHandler(AppDbContext dbContext,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<UserDTO> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.Where(u => u.Email == request.Payload.Email).SingleOrDefaultAsync(cancellationToken);
        if (user == null)
        {
            throw new UnauthorizedException("Email or password is invalid.");
        }

        var password = await _passwordHasher.HashAsync(request.Payload.Password, user.Salt, cancellationToken);
        if (!user.Hash.SequenceEqual(password))
        {
            throw new UnauthorizedException("Email or password is invalid.");
        }

        return new UserDTO
        {
            Email = user.Email,
            Bio = user.Bio,
            Image = user.Image,
            UserName = user.Username,
            Token = await _jwtTokenGenerator.CreateTokenAsync(user.Id, cancellationToken)
        };
    }
}

