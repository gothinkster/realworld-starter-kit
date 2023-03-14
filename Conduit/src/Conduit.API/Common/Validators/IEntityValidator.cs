using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Common.Validators;

public interface IEntityValidator
{
    bool Handle(EntityState state);
}
