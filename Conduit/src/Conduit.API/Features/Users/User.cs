namespace Conduit.API.Features.Users;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Image { get; set; }

    public byte[] Hash { get; set; } = Array.Empty<byte>();

    public byte[] Salt { get; set; } = Array.Empty<byte>();
}
