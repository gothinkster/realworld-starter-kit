using System.Threading.Tasks;
using Conduit.Domain.Common;

namespace Conduit.Persistence;

public class SqliteUnitOfWork : IUnitOfWork
{
    readonly SqliteContext _context;

    public SqliteUnitOfWork(SqliteContext context)
    {
        _context = context;
    }

    public Task<int> CommitAsync()
    {
        return _context.SaveChangesAsync();
    }

    public void Rollback()
    {
        _context.ChangeTracker.Clear();
    }
}
