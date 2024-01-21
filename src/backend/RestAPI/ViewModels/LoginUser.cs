namespace Conduit.RestAPI.ViewModels;

public record LoginUser
{
    public required string Email { get; init; }
    public required string Password { get; init; }
}
