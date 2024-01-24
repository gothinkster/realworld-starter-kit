using System;
using System.Collections.Generic;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.User;

public class UserEmail : ValueObject
{
    public string Value { get; }

    protected UserEmail(string email)
    {
        Value = email;
    }

    public static UserEmail Create(string email)
    {
        string emailLowerCase = email.ToLower();
        //CheckRule(new UserEmailMustBeValidRule(emailLowerCase));

        return new UserEmail(emailLowerCase);
    }

    protected override IEnumerable<IComparable> GetEqualityComponents()
    {
        yield return Value;
    }
}
