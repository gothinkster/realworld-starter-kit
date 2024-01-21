using System;

namespace Conduit.Domain.User.Events;

public class PasswordChangedDomainEvent : IDomainEvent
{
    public Guid Id { get; }
    public DateTime OccurredOn { get; }
    public string Username { get; }

    public PasswordChangedDomainEvent(string username)
    {
        Id = Guid.NewGuid();
        OccurredOn = DateTime.Now;
        Username = username;
    }
}
