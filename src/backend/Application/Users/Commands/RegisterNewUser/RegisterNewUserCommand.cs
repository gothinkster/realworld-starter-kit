using Conduit.Application.Users.Commands.Dtos;
using Conduit.Domain.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Conduit.Application.Users.Commands.RegisterNewUser;

public class RegisterNewUserCommand : IRequest<Result<UserDto, RuleError>>
{
    public required string Email { get; init; }
    public required string Username { get; init; }
    public required string Password { get; init; }
}
