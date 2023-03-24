namespace Conduit.API.Features.Users;

public class AuthorResponseData
{
    public string UserName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Image { get; set; }
}
