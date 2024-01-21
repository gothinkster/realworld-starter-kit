namespace Conduit.Domain.User.Rules;

public class UserEmailMustBeUniqueRule : IBusinessRule
{
    readonly IUsersCounter _usersCounter;
    readonly UserEmail _email;

    public UserEmailMustBeUniqueRule(UserEmail email, IUsersCounter usersCounter)
    {
        _email = email;
        _usersCounter = usersCounter;
    }

    public string Message => "Email must be unique";

    public bool IsBroken()
    {
        return _usersCounter.CountUsersWithEmailAsync(_email).GetAwaiter().GetResult() > 0;
    }
}
