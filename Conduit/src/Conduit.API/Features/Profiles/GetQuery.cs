using MediatR;

namespace Conduit.API.Features.Profiles;

public record GetQuery(string Username) : IRequest<ProfileResponse>;
