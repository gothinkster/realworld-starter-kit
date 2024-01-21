using System.Threading;
using System.Threading.Tasks;
using Conduit.Domain.User;
using Microsoft.EntityFrameworkCore;

namespace Conduit.Persistence.Users;

public class SqliteUsersCounter : IUsersCounter
{
    readonly SqliteContext _context;

    public SqliteUsersCounter(SqliteContext context)
    {
        _context = context;
    }

    public Task<int> CountUsersWithEmailAsync(UserEmail email, CancellationToken cancellationToken = default)
    {
        return _context.Users.CountAsync(u => u.Id == email, cancellationToken);
    }

    public Task<int> CountUsersWithUsernameAsync(string username, CancellationToken cancellationToken = default)
    {
        return _context.Users.CountAsync(u => u.Username == username, cancellationToken);
    }
}
