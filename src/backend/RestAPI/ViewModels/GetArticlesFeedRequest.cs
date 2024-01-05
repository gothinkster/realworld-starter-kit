using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Conduit.RestAPI.ViewModels;

public record class GetArticlesFeedRequest
{
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
