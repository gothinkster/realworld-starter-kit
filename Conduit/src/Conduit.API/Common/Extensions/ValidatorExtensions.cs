using Conduit.API.Common.Validators;
using FluentValidation;

namespace FluentValidation;

public static class ValidatorExtensions
{
    public static IRuleBuilderOptions<T, TProperty> OptionalArgument<T, TProperty>(this IRuleBuilder<T, TProperty> ruleBuilder)
    {
        return ruleBuilder.SetValidator(new OptionalArgumentValidator<T, TProperty>());
    }
}
