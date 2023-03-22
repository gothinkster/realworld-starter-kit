using Conduit.API.Features.Comments;
using Conduit.API.Features.Users;

namespace Conduit.API.Features.Articles;

public class Article
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? Body { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int? AuthorId { get; set; }
    public User? Author { get; set; } = new();

    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}

public record ArticleResponse(Article Article);