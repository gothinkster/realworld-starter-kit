using System;
using System.Collections.Generic;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.Common;

public abstract class DomainEvent : ValueObject, IDomainEvent
{
    public Guid Id { get; }
    public DateTime OccurredOn { get; }

    public DomainEvent()
    {
        Id = Guid.NewGuid();
        OccurredOn = DateTime.Now;
    }

    protected override IEnumerable<IComparable> GetEqualityComponents()
    {
        yield return OccurredOn;
        yield return Id;
    }
}
