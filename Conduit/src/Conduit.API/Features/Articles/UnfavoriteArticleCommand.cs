using MediatR;

namespace Conduit.API.Features.Articles;

public record UnfavoriteArticleCommand(string Slug) : IRequest<ArticleResponse>;
