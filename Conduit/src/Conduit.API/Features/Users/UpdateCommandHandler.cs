using Conduit.API.Infrastructure;
using Conduit.API.Infrastructure.Auth;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Users;

public class UpdateCommandHandler : IRequestHandler<UpdateCommand, UserDTO>
{
    private readonly AppDbContext _appDbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public UpdateCommandHandler(
        AppDbContext appDbContext,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _appDbContext = appDbContext;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<UserDTO> Handle(UpdateCommand request, CancellationToken cancellationToken)
    {
        var user = await _appDbContext.Users.Where(u => u.Id == request.UserId).FirstOrDefaultAsync(cancellationToken);
        if(user is null)
        {
            throw new ArgumentException("User not found.");
        }

        user.Username = request.Payload.Username ?? user.Username;
        user.Email = request.Payload.Email ?? user.Email;
        user.Bio = request.Payload.Bio ?? user.Bio;
        user.Image = request.Payload.Image ?? user.Image;

        if (!string.IsNullOrWhiteSpace(request.Payload.Password))
        {
            var salt = Guid.NewGuid().ToByteArray();
            user.Hash = await _passwordHasher.HashAsync(request.Payload.Password, salt, cancellationToken);
            user.Salt = salt;
        }

        await _appDbContext.SaveChangesAsync(cancellationToken);

        return new UserDTO
        {
            UserName = user.Username,
            Email = user.Email,
            Bio = user.Bio,
            Image = user.Image,
        };
    }
}