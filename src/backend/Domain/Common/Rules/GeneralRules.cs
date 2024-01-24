using System.Text.RegularExpressions;

namespace Conduit.Domain.Common;

public static partial class GeneralRules
{
    public static bool EmailIsValid(string email)
    {
        return ValidEmailRegEx().IsMatch(email);
    }

    [GeneratedRegex(@"^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$", RegexOptions.IgnoreCase)]
    private static partial Regex ValidEmailRegEx();
}
