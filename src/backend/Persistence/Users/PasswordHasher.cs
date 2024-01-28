using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using Conduit.Domain.User;

namespace Conduit.Persistence.Users;

public class PasswordHasher : IPasswordHasher
{
    const byte VersionId1 = 0x01;
    const byte DefaultVersionId = VersionId1;

    static readonly Dictionary<byte, PasswordHasherVersion> Versions = new()
    {
        [VersionId1] = new PasswordHasherVersion
        {
            Algorithm = HashAlgorithmName.SHA256,
            SaltSize = 256 / 8,
            KeySize = 256 / 8,
            Iterations = 600000
        }
    };

    public string HashPassword(string clearTextPassword)
    {
        PasswordHasherVersion currentVersion = Versions[DefaultVersionId];
        int hashedPasswordByteCount = 1 + currentVersion.SaltSize + currentVersion.KeySize;
        Span<byte> hashedPasswordBytes = stackalloc byte[hashedPasswordByteCount];

        Span<byte> saltBytes = hashedPasswordBytes.Slice(
            start: 1,
            length: currentVersion.SaltSize);
        Span<byte> keyBytes = hashedPasswordBytes.Slice(
            start: 1 + currentVersion.SaltSize,
            length: currentVersion.KeySize);

        hashedPasswordBytes[0] = DefaultVersionId;
        RandomNumberGenerator.Fill(saltBytes);
        Rfc2898DeriveBytes.Pbkdf2(clearTextPassword, saltBytes, keyBytes, currentVersion.Iterations, currentVersion.Algorithm);

        return Convert.ToBase64String(hashedPasswordBytes);
    }

    public bool VerifyPassword(string clearTextPassword, string hashedPassword)
    {
        Span<byte> hashedPasswordBytes = Convert.FromBase64String(hashedPassword);
        PasswordHasherVersion usedVersion = Versions[hashedPasswordBytes[0]];

        Span<byte> saltBytes = hashedPasswordBytes.Slice(
            start: 1,
            length: usedVersion.SaltSize);
        Span<byte> expectedKeyBytes = hashedPasswordBytes.Slice(
            start: 1 + usedVersion.SaltSize,
            length: usedVersion.KeySize);

        Span<byte> actualKeyBytes = stackalloc byte[usedVersion.KeySize];
        Rfc2898DeriveBytes.Pbkdf2(clearTextPassword, saltBytes, actualKeyBytes, usedVersion.Iterations, usedVersion.Algorithm);

        return CryptographicOperations.FixedTimeEquals(expectedKeyBytes, actualKeyBytes);
    }
}
