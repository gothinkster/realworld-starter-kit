namespace Conduit.RestAPI.ViewModels;

public record UpdateUser
{
    public string? Email
    {
        get; init;
    }
    public string? Token
    {
        get; init;
    }
    public string? Username
    {
        get; init;
    }
    public string? Bio
    {
        get; init;
    }
    public string? Image
    {
        get; init;
    }
}
