using MediatR;

namespace Conduit.API.Features.Articles;

public record UpdateCommand(string Slug, UpdatePayload Payload) : IRequest<ArticleResponse>;

public record UpdatePayload(UpdateData Article);

public record UpdateData
{
    public string? Title { get; init; }

    public string? Description { get; init; }

    public string? Body { get; init; }
}