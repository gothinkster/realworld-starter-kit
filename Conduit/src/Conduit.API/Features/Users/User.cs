using System.Text.Json.Serialization;

namespace Conduit.API.Features.Users;

public class User
{
    [JsonIgnore]
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Image { get; set; }

    [JsonIgnore]
    public byte[] Hash { get; set; } = Array.Empty<byte>();

    [JsonIgnore]
    public byte[] Salt { get; set; } = Array.Empty<byte>();
}
