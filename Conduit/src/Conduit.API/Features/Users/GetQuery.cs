using MediatR;

namespace Conduit.API.Features.Users;

public record GetQuery(string Username) : IRequest<UserDTO>;
