namespace Conduit.RestAPI.ViewModels;

public record class GenericErrorModel
{
    public required Errors Errors { get; init; }
}
