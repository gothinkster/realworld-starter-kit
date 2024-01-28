using System.Threading;
using System.Threading.Tasks;

namespace Conduit.Domain.User;

public interface IUsersCounter
{
    Task<int> CountUsersWithEmailAsync(UserEmail email, CancellationToken cancellationToken = default);
    Task<int> CountUsersWithUsernameAsync(Username username, CancellationToken cancellationToken = default);
}
