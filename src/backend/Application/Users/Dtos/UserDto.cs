namespace Conduit.Application.Users.Commands.Dtos;

public record UserDto
{
    public required string Email { get; init; }
    public required string Token { get; init; }
    public required string Username { get; init; }
    public required string Bio { get; init; }
    public required string Image { get; init; }
}
