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

    public static Result<UserEmail, Error> Create(string email)
    {
        string emailLowerCase = email.ToLower();

        return UserRules.EmailIsValidRule(emailLowerCase)
            .Bind<UserEmail, Error>(() => new UserEmail(emailLowerCase));
    }

    protected override IEnumerable<IComparable> GetEqualityComponents()
    {
        yield return Value;
    }
}
