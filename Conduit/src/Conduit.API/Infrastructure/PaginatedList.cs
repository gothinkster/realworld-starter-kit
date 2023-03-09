namespace Conduit.API.Infrastructure;

public class PaginatedList<T>
{
    public List<T> Items { get; }

    public int TotalCount { get; }

    public PaginatedList(List<T> items, int count)
    {
        TotalCount = count;
        Items = items;
    }
}