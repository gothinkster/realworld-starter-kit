using System.Text.RegularExpressions;

namespace Conduit.Domain;

public partial class UserEmailMustBeValidRule : IBusinessRule
{
    readonly string _email;

    public UserEmailMustBeValidRule(string email)
    {
        _email = email;
    }

    public string Message => "Email must be valid";

    public bool IsBroken()
    {
        return ValidEmailRegEx().IsMatch(_email) == false;
    }

    [GeneratedRegex(@"^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$", RegexOptions.IgnoreCase)]
    private static partial Regex ValidEmailRegEx();
}
