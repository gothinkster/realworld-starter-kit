namespace Conduit.RestAPI.ViewModels;

public record NewCommentRequest
{
    public required NewComment Comment { get; init; }
}
