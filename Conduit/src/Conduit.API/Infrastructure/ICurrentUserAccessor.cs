namespace Conduit.API.Infrastructure;

public interface ICurrentUserAccessor
{
    int? UserId { get; }
}
