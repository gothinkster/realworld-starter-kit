using Conduit.Domain.Common;

namespace Conduit.Domain.User.Events;

public class PasswordChangedDomainEvent : DomainEvent
{
    public string Username { get; }

    public PasswordChangedDomainEvent(string username) : base()
    {
        Username = username;
    }
}
