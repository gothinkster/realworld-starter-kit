namespace Conduit.Application.Users.Dtos;

public record UserDto
{
    public required string Id { get; init; }
    public required string Email { get; init; }
    public required string Token { get; set; }
    public required string Username { get; init; }
    public required string Bio { get; init; }
    public required string Image { get; init; }
}
