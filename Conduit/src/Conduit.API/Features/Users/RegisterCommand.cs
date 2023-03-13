using MediatR;

namespace Conduit.API.Features.Users;

public record RegisterCommand(RegisterPayload Payload) : IRequest<UserDTO>;

public record RegisterPayload 
{
    public string Username { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

}
