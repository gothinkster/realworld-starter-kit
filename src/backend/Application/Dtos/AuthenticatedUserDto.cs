namespace Conduit.Application.Dtos;

public record AuthenticatedUserDto
{
    public required string UserId { get; init; }
}
