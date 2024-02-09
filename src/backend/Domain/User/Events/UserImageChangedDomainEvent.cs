using Conduit.Domain.Common;

namespace Conduit.Domain.User.Events;

public class UserImageChangedDomainEvent : DomainEvent
{
    public string Email { get; }
    public string OldImage { get; }
    public string NewImage { get; }

    public UserImageChangedDomainEvent(string email, string oldImage, string newImage) : base()
    {
        Email = email;
        NewImage = newImage;
        OldImage = oldImage;
    }
}
