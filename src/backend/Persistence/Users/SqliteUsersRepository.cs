using System.Threading;
using System.Threading.Tasks;
using Conduit.Domain;
using Conduit.Domain.User;
using Microsoft.EntityFrameworkCore;

namespace Conduit.Persistence.Users;

public class SqliteUsersRepository : IUsersRepository
{
    readonly SqliteContext _context;

    public SqliteUsersRepository(SqliteContext context)
    {
        _context = context;
    }

    public async Task AddAsync(User user, CancellationToken cancellationToken = default)
    {
        await _context.Users.AddAsync(user, cancellationToken);
    }

    public Task<User> GetByIdAsync(UserId id, CancellationToken cancellationToken = default)
    {
        return _context.Users.FirstAsync(u => u.Id == id, cancellationToken);
    }

    public Task<User> GetByEmailAsync(UserEmail email, CancellationToken cancellationToken = default)
    {
        return _context.Users.FirstAsync(u => u.Email.Value == email.Value, cancellationToken);
    }
}
