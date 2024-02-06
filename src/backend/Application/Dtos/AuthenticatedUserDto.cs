namespace Conduit.Application.Dtos;

public record AuthenticatedUserDto
{
    public required string EMail { get; init; }
}
