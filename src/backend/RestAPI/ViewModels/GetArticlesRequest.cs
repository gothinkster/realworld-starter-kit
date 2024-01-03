using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Conduit.RestAPI.ViewModels;

public record GetArticlesRequest
{
    /// <summary>
    /// Filter by tag
    /// </summary>
    public string? Tag { get; init; }
    /// <summary>
    /// Filter by author (username)
    /// </summary>
    public string? Author { get; init; }
    /// <summary>
    /// Filter by favorites of a user (username)
    /// </summary>
    public string? Favorited { get; init; }
    /// <summary>
    /// The number of items to skip before starting to collect the result set.
    /// </summary>
    [Range(0, double.PositiveInfinity), DefaultValue(0)]
    public uint Offset { get; init; } = 0;
    /// <summary>
    /// The numbers of items to return.
    /// </summary>
    [Range(1, double.PositiveInfinity), DefaultValue(20)]
    public uint Limit { get; init; } = 20;
}
