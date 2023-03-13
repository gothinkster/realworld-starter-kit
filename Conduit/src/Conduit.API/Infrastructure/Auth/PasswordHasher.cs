using System.Security.Cryptography;
using System.Text;

namespace Conduit.API.Infrastructure.Auth;

public sealed class PasswordHasher : IPasswordHasher
{
    private readonly HMACSHA512 _hmacsha512 = new(Encoding.UTF8.GetBytes("Conduit"));

    public Task<byte[]> HashAsync(string password, byte[] salt, CancellationToken cancellationToken)
    {
        var bytes = Encoding.UTF8.GetBytes(password);

        var allBytes = new byte[bytes.Length + salt.Length];
        Buffer.BlockCopy(bytes, 0, allBytes, 0, bytes.Length);
        Buffer.BlockCopy(salt, 0, allBytes, bytes.Length, salt.Length);

        return _hmacsha512.ComputeHashAsync(new MemoryStream(allBytes), cancellationToken);
    }

    public void Dispose() => _hmacsha512.Dispose();
}