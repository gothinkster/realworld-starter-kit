using MediatR;

namespace Conduit.API.Features.Users;

public record RegisterCommand(RegisterPayload Payload) : IRequest<UserResponse>;

public record RegisterPayload(RegisterData User);

public record RegisterData
{
    public string Username { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}