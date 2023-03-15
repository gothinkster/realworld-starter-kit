using MediatR;

namespace Conduit.API.Features.Articles;

public record GetQuery(string Slug): IRequest<ArticleResponse>;
