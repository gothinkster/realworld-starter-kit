using System.Security.Cryptography;

namespace Conduit.Persistence.Users;

record PasswordHasherVersion
{
    public required HashAlgorithmName Algorithm { get; init; }
    public required int SaltSize { get; init; }
    public required int KeySize { get; init; }
    public required int Iterations { get; init; }
}
