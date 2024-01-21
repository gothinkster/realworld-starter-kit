namespace Conduit.Domain;

public interface IPasswordHasher
{
    string HashPassword(string clearTextPassword);
    bool VerifyPassword(string clearTextPassword, string hashedPassword);
}
