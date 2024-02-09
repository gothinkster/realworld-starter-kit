using Conduit.Domain.Common;

namespace Conduit.Domain.User.Events;

public class UserBioChangedDomainEvent : DomainEvent
{
    public string Email { get; }
    public string OldBio { get; }
    public string NewBio { get; }

    public UserBioChangedDomainEvent(string email, string oldBio, string newBio) : base()
    {
        Email = email;
        NewBio = newBio;
        OldBio = oldBio;
    }
}
