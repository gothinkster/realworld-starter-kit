using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Users.Dtos;
using Conduit.Application.Users.Repositories;
using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;

namespace Conduit.Persistence.Users;

public class SqliteUsersQueryRepository : IUsersQueryRepository
{
    readonly SqliteContext _context;

    public SqliteUsersQueryRepository(SqliteContext context)
    {
        _context = context;
    }

    public Task<LoginDto?> FindLoginByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return _context.Users
            .Where(u => u.Id == email)
            .Select(u => new LoginDto { Email = u.Email.Value, HashedPassword = u.HashedPassword })
            .SingleOrDefaultAsync(cancellationToken);
    }

    public Task<UserDto> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return _context.Users
            .Where(u => u.Id == email)
            .Select(u => new UserDto { Email = u.Email.Value, Bio = u.Bio, Image = u.Image, Token = string.Empty, Username = u.Username.Value })
            .SingleAsync(cancellationToken);
    }
}
