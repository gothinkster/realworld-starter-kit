using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Common.Validators;

public class EntityValidationService : IEntityValidationService
{
    private readonly IServiceProvider _serviceProvider;

    public EntityValidationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task<ValidationResult> ValidateAsync<TEntity>(
        TEntity entity, 
        EntityState state, 
        CancellationToken cancellationToken) 
        where TEntity : class
    {
        var validatorType = typeof(EntityValidatorBase<>).MakeGenericType(typeof(TEntity));
        var validators = _serviceProvider.GetServices(validatorType);
        if (validators is null || !validators.Any())
        {
            return new ValidationResult();
        }

        var context = new ValidationContext<TEntity>(entity);
        var result = new ValidationResult();

        foreach (var validator in validators.Where(v => v is not null))
        {
            if (validator is IEntityValidator entityValidator 
                && entityValidator.Handle(state) 
                && entityValidator is IValidator validValidator)
            {
                result = await validValidator.ValidateAsync(context, cancellationToken);
            }
        }

        return result;

    }
}
