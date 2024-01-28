namespace Conduit.Domain.Common;

public record ErrorWithDetails : Error
{
    public required Error[] Details { get; init; }
}
