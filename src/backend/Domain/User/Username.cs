using System;
using System.Collections.Generic;
using Conduit.Domain.Common;
using Conduit.Domain.User.Rules;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.User;

public class Username : ValueObject
{
    public string Value { get; }

    protected Username(string email)
    {
        Value = email;
    }

    public static Result<Username, Error> Create(string username)
    {
        return Result.Combine(
            UserErrors.ComposeUsernameValidationError,
            UserRules.UsernameMustBeProvidedRule(username),
            UserRules.UsernameCanOnlyContainLettersAndNumbersRule(username))
            .Bind<Username, Error>(() => new Username(username));
    }

    protected override IEnumerable<IComparable> GetEqualityComponents()
    {
        yield return Value;
    }
}
