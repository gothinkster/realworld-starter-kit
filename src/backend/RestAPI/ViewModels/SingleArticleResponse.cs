namespace Conduit.RestAPI.ViewModels;

public record SingleArticleResponse
{
    public required Article Article { get; init; }
}
