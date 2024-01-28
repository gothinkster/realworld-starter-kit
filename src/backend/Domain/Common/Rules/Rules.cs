using System.Text.RegularExpressions;

namespace Conduit.Domain.Common;

static partial class Rules
{
    public static bool EmailIsValidRule(string email)
    {
        return ValidEmailRegEx().IsMatch(email);
    }

    [GeneratedRegex(@"^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$", RegexOptions.IgnoreCase)]
    private static partial Regex ValidEmailRegEx();
}
