using MediatR;
using System;

namespace Conduit.API.Features.Users;

public record LoginCommand(LoginPayload Payload) : IRequest<UserDTO>;

public record LoginPayload
{
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}

