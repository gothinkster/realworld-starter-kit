namespace Conduit.Domain.User.Rules;

public class UsernameMustBeUniqueRule : IBusinessRule
{
    readonly IUsersCounter _usersCounter;
    readonly string _username;

    public UsernameMustBeUniqueRule(string username, IUsersCounter usersCounter)
    {
        _username = username;
        _usersCounter = usersCounter;
    }

    public string Message => "Username must be unique";

    public bool IsBroken()
    {
        return _usersCounter.CountUsersWithUsernameAsync(_username).GetAwaiter().GetResult() > 0;
    }
}
