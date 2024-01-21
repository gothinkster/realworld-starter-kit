namespace Conduit.RestAPI.ViewModels;

public record NewComment
{
    public required string Body { get; init; }
}
