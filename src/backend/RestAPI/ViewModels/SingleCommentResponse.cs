namespace Conduit.RestAPI.ViewModels;

/// <summary>
/// Single comment
/// </summary>
public record SingleCommentResponse
{
    public required Comment Comment { get; set; }
}
