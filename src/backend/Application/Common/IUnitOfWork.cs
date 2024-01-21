using System.Threading.Tasks;

namespace Conduit.Application.Common;

public interface IUnitOfWork
{
    Task<int> CommitAsync();
    void Rollback();
}
