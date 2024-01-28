namespace Conduit.Domain.Common;

public record Error
{
    public required string Message { get; init; }
    public required string ErrorCode { get; init; }
}
