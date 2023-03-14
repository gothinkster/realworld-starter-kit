using FluentValidation;
using FluentValidation.Validators;
using System.Collections;

namespace Conduit.API.Common.Validators;

public class OptionalArgumentValidator<T, TProperty> : PropertyValidator<T, TProperty>
{
    public override string Name => nameof(OptionalArgumentValidator<T, TProperty>);

    public override bool IsValid(ValidationContext<T> context, TProperty value)
    {
        if (value is not null)
        {
            switch (value)
            {
                case string s when s.Trim() == string.Empty:
                case ICollection { Count: 0 }:
                case Array { Length: 0 }:
                case IEnumerable e when !e.GetEnumerator().MoveNext():
                    return false;
            }
        }

        return true;
    }

    protected override string GetDefaultMessageTemplate(string errorCode)
    {
        return Localized(errorCode, Name);
    }
}