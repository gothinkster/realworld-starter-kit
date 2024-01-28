using Conduit.Domain.Common;

namespace Conduit.Domain.User.Events;

public class UsernameChangedDomainEvent : DomainEvent
{
    public string OldUsername { get; }
    public string NewUsername { get; }

    public UsernameChangedDomainEvent(string oldUsername, string newUsername) : base()
    {
        NewUsername = newUsername;
        OldUsername = oldUsername;
    }
}
