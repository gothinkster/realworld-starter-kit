using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Users.Dtos;

namespace Conduit.Application.Users.Repositories;

public interface IUsersQueryRepository
{
    Task<LoginDto?> FindLoginByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<UserDto> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
}
