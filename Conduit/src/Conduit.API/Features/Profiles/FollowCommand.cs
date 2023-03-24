using MediatR;

namespace Conduit.API.Features.Profiles;

public record FollowCommand(string Username) : IRequest<ProfileResponse>;
