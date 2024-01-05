using System.Collections.Generic;

namespace Conduit.RestAPI.ViewModels;

/// <summary>
/// Multiple comments
/// </summary>
public record MultipleCommentsResponse
{
    public required IEnumerable<Comment> Comments
    {
        get; init;
    }
}
