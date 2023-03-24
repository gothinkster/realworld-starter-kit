using MediatR;

namespace Conduit.API.Features.Profiles;

public record UnfollowCommand(string Username) : IRequest<ProfileResponse>;
