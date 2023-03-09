using MediatR;

namespace Conduit.API.Features.Articles;

public record CreateCommand(CreatePayload Payload) : IRequest<Article>;

public record CreatePayload
{
    public string Title { get; init; } = string.Empty;

    public string? Description { get; init; }

    public string? Body { get; init; }
}