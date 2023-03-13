namespace Conduit.API.Infrastructure.Auth;

public interface IPasswordHasher : IDisposable
{
    Task<byte[]> HashAsync(string password, byte[] salt, CancellationToken cancellationToken);
}
