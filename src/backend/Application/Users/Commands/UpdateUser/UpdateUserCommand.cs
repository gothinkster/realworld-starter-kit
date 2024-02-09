using Conduit.Application.Users.Dtos;
using Conduit.Domain.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Conduit.Application.Users.Commands.UpdateUser;

public class UpdateUserCommand : IRequest<Result<UserDto, Error>>
{
    public string? Email { get; init; }
    public string? Username { get; init; }
    public string? Password { get; init; }
    public string? Bio { get; init; }
    public string? Image { get; init; }
}
