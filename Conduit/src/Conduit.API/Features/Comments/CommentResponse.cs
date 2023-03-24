using Conduit.API.Features.Users;

namespace Conduit.API.Features.Comments;

public record CommentResponse(CommentResponseData Comment);

public record CommentsResponse(IEnumerable<CommentResponseData> Comments);

public record CommentResponseData
{
    public int Id { get; set; }

    public string? Body { get; set; }

    public AuthorResponseData? Author { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}