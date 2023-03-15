using MediatR;

namespace Conduit.API.Features.Users;

public record UpdateCommand(int UserId, UpdatePayload Payload) : IRequest<UserResponse>;

public record UpdatePayload(UpdateData User);

public record UpdateData
{
    public string? Username { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Bio { get; set; }

    public string? Image { get; set; }
}