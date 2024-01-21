using System;

namespace Conduit.Domain.User.Events;

public class UsernameChangedDomainEvent : IDomainEvent
{
    public Guid Id { get; }
    public DateTime OccurredOn { get; }
    public string OldUsername { get; }
    public string NewUsername { get; }

    public UsernameChangedDomainEvent(string oldUsername, string newUsername)
    {
        Id = Guid.NewGuid();
        OccurredOn = DateTime.Now;
        NewUsername = newUsername;
        OldUsername = oldUsername;
    }
}
