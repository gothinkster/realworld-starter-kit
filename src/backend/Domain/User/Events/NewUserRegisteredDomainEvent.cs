using System;

namespace Conduit.Domain.User.Events;

public class NewUserRegisteredDomainEvent : IDomainEvent
{
    public Guid Id { get; }
    public DateTime OccurredOn { get; }
    public string Email { get; }
    public string Username { get; }

    public NewUserRegisteredDomainEvent(string email, string username)
    {
        Id = Guid.NewGuid();
        OccurredOn = DateTime.Now;
        Email = email;
        Username = username;
    }
}
