namespace Conduit.RestAPI.ViewModels;

public record class UpdateUserRequest
{
    public required UpdateUser User { get; init; }
}
