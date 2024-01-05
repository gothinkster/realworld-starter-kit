using System.Collections.Generic;

namespace Conduit.RestAPI.ViewModels;

/// <summary>
/// Tags
/// </summary>
public record TagsResponse
{
    public required IEnumerable<string> Tags
    {
        get; set;
    }
}
