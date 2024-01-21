namespace Conduit.RestAPI.ViewModels;

public record NewArticleRequest
{
    public required NewArticle Article { get; init; }
}
