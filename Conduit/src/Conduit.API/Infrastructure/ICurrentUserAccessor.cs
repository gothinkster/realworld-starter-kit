namespace Conduit.API.Infrastructure;

public interface ICurrentUserAccessor
{
    string? GetCurrentUsername();
}
