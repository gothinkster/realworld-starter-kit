using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Common.Validators;

public interface IEntityValidationService
{
    Task<ValidationResult> ValidateAsync<TEntity>(TEntity entity, EntityState state, CancellationToken cancellationToken) where TEntity : class;
}
