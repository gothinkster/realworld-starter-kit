namespace Conduit.RestAPI.ViewModels;

/// <summary>
/// User
/// </summary>
public record UserResponse
{
    public required User User
    {
        get; init;
    }
}
