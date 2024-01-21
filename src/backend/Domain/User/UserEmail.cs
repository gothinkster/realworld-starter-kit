using System;
using System.Collections.Generic;
using Conduit.Domain.Common;

namespace Conduit.Domain.User;

public class UserEmail : ValueObject
{
    public string Value { get; }

    public UserEmail(string email)
    {
        CheckRule(new UserEmailMustBeValidRule(email));

        Value = email;
    }

    protected override IEnumerable<IComparable?> GetAtomicValues()
    {
        yield return Value;
    }
}
