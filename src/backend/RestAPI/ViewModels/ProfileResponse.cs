namespace Conduit.RestAPI.ViewModels;

/// <summary>
/// Profile
/// </summary>
public record ProfileResponse
{
    public required Profile Profile { get; init; }
}
