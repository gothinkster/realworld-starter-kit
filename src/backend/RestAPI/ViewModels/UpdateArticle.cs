namespace Conduit.RestAPI.ViewModels;

public record UpdateArticle
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required string Body { get; init; }
}
