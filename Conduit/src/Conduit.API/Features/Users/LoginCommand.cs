using MediatR;
using System;

namespace Conduit.API.Features.Users;

public record LoginCommand(LoginPayload Payload) : IRequest<UserResponse>;

public record LoginPayload(LoginData User);

public record LoginData
{
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}