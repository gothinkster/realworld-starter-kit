using System;

namespace Conduit.RestAPI.ViewModels;

public record Comment
{
    public required int Id
    {
        get; init;
    }
    public required DateTime CreatedAt
    {
        get; init;
    }
    public required DateTime UpdatedAt
    {
        get; init;
    }
    public required string Body
    {
        get; init;
    }
    public required Profile Author
    {
        get; init;
    }
}
