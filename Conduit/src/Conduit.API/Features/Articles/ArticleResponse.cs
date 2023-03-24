using Conduit.API.Features.Users;

namespace Conduit.API.Features.Articles;

public record ArticleResponse(ArticleResponseData Article);

public record ArticleResponseData
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? Body { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public AuthorResponseData? Author { get; set; } = new();
}