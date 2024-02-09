using Conduit.Domain.Common;

namespace Conduit.Domain.User.Events;

public class UserEMailChangedDomainEvent : DomainEvent
{
    public string OldEmail { get; }
    public string NewEmail { get; }

    public UserEMailChangedDomainEvent(string oldEmail, string newEmail) : base()
    {
        NewEmail = newEmail;
        OldEmail = oldEmail;
    }
}
