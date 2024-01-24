namespace Conduit.Domain.Common;

public record RuleError
{
    public required string Message { get; init; }
    public required string ErrorCode { get; init; }
    public RuleError[]? Details { get; init; }
}
