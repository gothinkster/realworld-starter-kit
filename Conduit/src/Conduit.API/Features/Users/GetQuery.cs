using MediatR;

namespace Conduit.API.Features.Users;

public record GetQuery() : IRequest<UserResponse>;
