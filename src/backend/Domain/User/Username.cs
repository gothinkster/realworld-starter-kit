using System;
using System.Collections.Generic;
using Conduit.Domain.Common;
using Conduit.Domain.User.Rules;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.User;

public class Username : ValueObject
{
    public string Value { get; }

#pragma warning disable CS8618 // Ein Non-Nullable-Feld muss beim Beenden des Konstruktors einen Wert ungleich NULL enthalten. Erwägen Sie die Deklaration als Nullable.
    protected Username()
    {
        //for ef only
    }
#pragma warning restore CS8618 // Ein Non-Nullable-Feld muss beim Beenden des Konstruktors einen Wert ungleich NULL enthalten. Erwägen Sie die Deklaration als Nullable.

    protected Username(string email)
    {
        Value = email;
    }

    public static Result<Username, Error> Create(string username)
    {
        return Result.Combine(
            UserRules.UsernameMustBeProvidedRule(username),
            UserRules.UsernameCanOnlyContainLettersAndNumbersRule(username))
            .Bind<Username, Error>(() => new Username(username));
    }

    protected override IEnumerable<IComparable> GetEqualityComponents()
    {
        yield return Value;
    }
}
