using System.Collections.Generic;

namespace Conduit.RestAPI.ViewModels;

public record NewArticle
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required string Body { get; init; }
    public IEnumerable<string>? TagList { get; init; }
}
