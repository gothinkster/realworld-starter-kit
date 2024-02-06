using Conduit.Application.Users.Dtos;
using Conduit.Domain.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Conduit.Application.Users.Queries.Login;

public class LoginQuery : IRequest<Result<UserDto, Error>>
{
    public required string Email { get; init; }
    public required string Password { get; init; }
}
