using System.Threading;
using System.Threading.Tasks;

namespace Conduit.Domain.User;

public interface IUsersRepository
{
    Task AddAsync(User user, CancellationToken cancellationToken = default);
    Task<User> GetByEmailAsync(UserEmail email, CancellationToken cancellationToken = default);
    Task<User> GetByIdAsync(UserId id, CancellationToken cancellationToken = default);
}
