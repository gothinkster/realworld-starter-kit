using System;
using MediatR;

namespace Conduit.Domain;

public interface IDomainEvent : INotification
{
    Guid Id { get; }
    DateTime OccurredOn { get; }
}
