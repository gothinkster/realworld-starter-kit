using Conduit.API.Infrastructure;
using MediatR;

namespace Conduit.API.Features.Articles;

public record ListQuery(int? Limit, int? Offset) : IRequest<PaginatedList<ArticleResponseData>>;
