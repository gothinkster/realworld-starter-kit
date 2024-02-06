namespace Conduit.Application.Dtos;

public record JwtOptions
{
    public required string Issuer { get; init; }
    public required string Audience { get; init; }
    public required string SigningKey { get; init; }
    public required uint ExpirationSeconds { get; init; }
}
