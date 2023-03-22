using MediatR;

namespace Conduit.API.Features.Comments;

public record ListQuery(string Slug) : IRequest<CommentsResponse>;
