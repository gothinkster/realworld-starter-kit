using System.Collections.Generic;

namespace Conduit.RestAPI.ViewModels;

public record Errors
{
    public required IEnumerable<string> Body { get; init; }
}
