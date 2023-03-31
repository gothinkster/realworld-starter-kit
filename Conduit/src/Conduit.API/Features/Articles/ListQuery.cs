using Conduit.API.Infrastructure;
using MediatR;

namespace Conduit.API.Features.Articles;

public record ListQuery(string? Tag, string? Author, string? FavoritedUsername, int? Limit, int? Offset) 
    : IRequest<PaginatedList<ArticleResponseData>>
{
    public bool IsFeed { get; init; } = false;
};
