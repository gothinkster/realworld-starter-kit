using System;
using System.Collections.Generic;

namespace Conduit.RestAPI.ViewModels;

public record Article
{
    public required string Slug
    {
        get; init;
    }
    public required string Title
    {
        get; init;
    }
    public required string Description
    {
        get; init;
    }
    public required string Body
    {
        get; init;
    }
    public required IEnumerable<string> tagList
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
    public required bool Favorited
    {
        get; init;
    }
    public required int FavoritesCount
    {
        get; init;
    }
    public required Profile Author
    {
        get; init;
    }
}
