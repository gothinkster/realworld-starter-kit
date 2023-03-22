using MediatR;

namespace Conduit.API.Features.Comments;

public record AddCommand(string Slug, AddPayload Payload) : IRequest<CommentResponse>;

public record AddPayload(AddData Comment);

public record AddData
{
    public string Body { get; init; } = string.Empty;
}
