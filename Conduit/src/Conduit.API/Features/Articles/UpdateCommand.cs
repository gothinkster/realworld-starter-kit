using MediatR;

namespace Conduit.API.Features.Articles;

public record UpdateCommand(string Slug, UpdatePayload Payload) : IRequest<Article>;

public record UpdatePayload
{
    public string? Title { get; init; }

    public string? Description { get; init; }

    public string? Body { get; init; }
}