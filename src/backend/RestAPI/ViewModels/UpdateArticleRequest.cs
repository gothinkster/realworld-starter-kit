namespace Conduit.RestAPI.ViewModels;

public record UpdateArticleRequest
{
    public required UpdateArticle Article
    {
        get; init;
    }
}
