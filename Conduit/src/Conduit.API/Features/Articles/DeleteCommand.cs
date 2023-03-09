using MediatR;

namespace Conduit.API.Features.Articles;

public record DeleteCommand(string Slug) : IRequest;
