using System;
using System.Collections.Generic;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.User;

public class UserEmail : ValueObject
{
    public string Value { get; }

    public UserEmail(string email)
    {
        //CheckRule(new UserEmailMustBeValidRule(email));

        Value = email.ToLower();
    }

    protected override IEnumerable<IComparable> GetEqualityComponents()
    {
        yield return Value;
    }
}
