using System;

namespace Conduit.Domain;

public interface IDomainEvent
{
    Guid Id
    {
        get;
    }
    DateTime OccurredOn
    {
        get;
    }
}
