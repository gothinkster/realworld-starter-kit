using System;
using System.Collections.Generic;
using Conduit.Domain.Common;
using Conduit.Domain.User.Rules;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.User;

public class UserEmail : ValueObject
{
    public string Value { get; }

    protected UserEmail(string email)
    {
        Value = email;
    }

    public static Result<UserEmail, RuleError> Create(string email)
    {
        string emailLowerCase = email.ToLower();
        UnitResult<RuleError> checkResult = UserRules.EmailIsValid(emailLowerCase);

        if (checkResult.IsFailure)
        {
            return Result.Failure<UserEmail, RuleError>(checkResult.Error);
        }

        return new UserEmail(emailLowerCase);
    }

    protected override IEnumerable<IComparable> GetEqualityComponents()
    {
        yield return Value;
    }
}
