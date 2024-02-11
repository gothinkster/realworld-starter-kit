using System;
using System.Collections.Generic;
using CSharpFunctionalExtensions;

namespace Conduit.Domain;

public class UserId : ValueObject
{
    public string Value { get; }

#pragma warning disable CS8618 // Ein Non-Nullable-Feld muss beim Beenden des Konstruktors einen Wert ungleich NULL enthalten. Erwägen Sie die Deklaration als Nullable.
    protected UserId()
    {
        //for ef only
    }
#pragma warning restore CS8618 // Ein Non-Nullable-Feld muss beim Beenden des Konstruktors einen Wert ungleich NULL enthalten. Erwägen Sie die Deklaration als Nullable.

    protected UserId(string id)
    {
        Value = id;
    }

    public static UserId Create()
    {
        return new UserId(Guid.NewGuid().ToString());
    }

    public static UserId Create(string id)
    {
        return new UserId(id);
    }

    protected override IEnumerable<IComparable> GetEqualityComponents()
    {
        yield return Value;
    }
}
