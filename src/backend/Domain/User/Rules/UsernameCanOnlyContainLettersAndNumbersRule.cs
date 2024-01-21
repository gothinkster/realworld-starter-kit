using System.Text.RegularExpressions;

namespace Conduit.Domain.User.Rules;

public partial class UsernameCanOnlyContainLettersAndNumbersRule : IBusinessRule
{
    readonly string _username;

    public UsernameCanOnlyContainLettersAndNumbersRule(string username)
    {
        _username = username;
    }

    public string Message => "Username can only contain letters and numbers";

    public bool IsBroken()
    {
        return ValidUsernameRegEx().IsMatch(_username) == false;
    }

    [GeneratedRegex("^[a-zA-Z0-9]*$")]
    private static partial Regex ValidUsernameRegEx();
}
