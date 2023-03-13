namespace Conduit.API.Infrastructure.Auth;

public interface IJwtTokenGenerator
{
    Task<string> CreateTokenAsync(int userId, CancellationToken cancellationToken);
}
