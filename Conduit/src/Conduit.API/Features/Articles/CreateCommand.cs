using MediatR;

namespace Conduit.API.Features.Articles;

public record CreateCommand(CreatePayload Payload) : IRequest<ArticleResponse>;

public record CreatePayload(CreateData Article);

public record CreateData
{
    public string Title { get; init; } = string.Empty;

    public string? Description { get; init; }

    public string? Body { get; init; }
}