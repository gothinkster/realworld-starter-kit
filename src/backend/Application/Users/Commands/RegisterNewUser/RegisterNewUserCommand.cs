using Conduit.Application.Users.Commands.Dtos;
using MediatR;

namespace Conduit.Application.Users.Commands.RegisterNewUser;

public class RegisterNewUserCommand : IRequest<UserDto>
{
    public required string Email { get; init; }
    public required string Username { get; init; }
    public required string Password { get; init; }
}
