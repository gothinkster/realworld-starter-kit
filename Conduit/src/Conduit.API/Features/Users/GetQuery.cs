using MediatR;

namespace Conduit.API.Features.Users;

public record GetQuery(int userId) : IRequest<UserDTO>;
