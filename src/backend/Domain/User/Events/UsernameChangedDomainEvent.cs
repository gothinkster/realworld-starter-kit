using Conduit.Domain.Common;

namespace Conduit.Domain.User.Events;

public class UsernameChangedDomainEvent : DomainEvent
{
    public string Email { get; }
    public string OldUsername { get; }
    public string NewUsername { get; }

    public UsernameChangedDomainEvent(string email, string oldUsername, string newUsername) : base()
    {
        Email = email;
        NewUsername = newUsername;
        OldUsername = oldUsername;
    }
}
