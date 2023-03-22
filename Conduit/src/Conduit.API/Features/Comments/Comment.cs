using System.Text.Json.Serialization;
using Conduit.API.Features.Users;
using Conduit.API.Features.Articles;

namespace Conduit.API.Features.Comments;

public class Comment
{
    public int Id { get; set; }

    public string? Body { get; set; }

    public User? Author { get; set; }

    [JsonIgnore]
    public int? AuthorId { get; set; }

    [JsonIgnore]
    public int ArticleId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}

public record CommentResponse(Comment Comment);

public record CommentsResponse(IEnumerable<Comment> Comments);