using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Common.Validators;

public abstract class EntityValidatorBase<TEntity> : AbstractValidator<TEntity>, IEntityValidator where TEntity : class
{
    public abstract bool Handle(EntityState state);
}
