using Conduit.Domain.Common;

namespace Conduit.Domain.User.Events;

public class NewUserRegisteredDomainEvent : DomainEvent
{
    public string Email { get; }
    public string Username { get; }

    public NewUserRegisteredDomainEvent(string email, string username) : base()
    {
        Email = email;
        Username = username;
    }
}
