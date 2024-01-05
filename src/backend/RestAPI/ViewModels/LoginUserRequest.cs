namespace Conduit.RestAPI.ViewModels;

public record LoginUserRequest
{
    public required LoginUser User
    {
        get; init;
    }
}
