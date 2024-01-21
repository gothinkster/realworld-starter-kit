namespace Conduit.Domain.User.Rules;

public class UsernameMustBeProvidedRule : IBusinessRule
{
    readonly string _username;

    public UsernameMustBeProvidedRule(string username)
    {
        _username = username;
    }

    public string Message => "Username must be provieded";

    public bool IsBroken()
    {
        return string.IsNullOrEmpty(_username);
    }
}
