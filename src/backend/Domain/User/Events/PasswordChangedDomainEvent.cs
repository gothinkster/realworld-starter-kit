using Conduit.Domain.Common;

namespace Conduit.Domain.User.Events;

public class PasswordChangedDomainEvent : DomainEvent
{
    public string Email { get; }

    public PasswordChangedDomainEvent(string email) : base()
    {
        Email = email;
    }
}
