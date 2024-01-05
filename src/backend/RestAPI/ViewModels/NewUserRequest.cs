namespace Conduit.RestAPI.ViewModels;

public record NewUserRequest
{
    public required NewUser User
    {
        get; init;
    }
}
