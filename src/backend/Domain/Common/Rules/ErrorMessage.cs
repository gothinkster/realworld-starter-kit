namespace Conduit.Domain.Common;

public record ErrorMessage
{
    public required string Message { get; init; }
    public required string ErrorCode { get; init; }
}
