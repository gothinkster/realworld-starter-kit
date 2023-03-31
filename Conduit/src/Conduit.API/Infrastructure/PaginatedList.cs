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

    public static PaginatedList<T> Empty => EmptyPaginatedList<T>.Instance;   
}

internal sealed class EmptyPaginatedList<T>
{
    private EmptyPaginatedList() { }

    public static readonly PaginatedList<T> Instance = new(new List<T>(), 0);
}