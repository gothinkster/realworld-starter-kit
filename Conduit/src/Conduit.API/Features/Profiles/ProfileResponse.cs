namespace Conduit.API.Features.Profiles;

public record ProfileResponse(ProfileResponseData Profile);

public record ProfileResponseData
{
    public string UserName { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Image { get; set; }

    public bool Following { get; set; }
}