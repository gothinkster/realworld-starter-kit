namespace Conduit.RestAPI.ViewModels;

public record NewUser
{
    public required string Email
    {
        get; init;
    }
    public required string Username
    {
        get; init;
    }
    public required string Password
    {
        get; init;
    }
}
