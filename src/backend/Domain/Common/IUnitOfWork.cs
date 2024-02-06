using System.Threading.Tasks;

namespace Conduit.Domain.Common;

public interface IUnitOfWork
{
    Task<int> CommitAsync();
    void Rollback();
}
