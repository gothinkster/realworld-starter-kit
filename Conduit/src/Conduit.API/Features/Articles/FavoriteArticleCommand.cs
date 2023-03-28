using MediatR;

namespace Conduit.API.Features.Articles;

public record FavoriteArticleCommand(string Slug) : IRequest<ArticleResponse>;
