namespace Conduit.RestAPI.ViewModels;

public record Profile
{
    public required string Username
    {
        get; init;
    }
    public required string Bio
    {
        get; init;
    }
    public required string Image
    {
        get; init;
    }
    public required bool Following
    {
        get; init;
    }
}
