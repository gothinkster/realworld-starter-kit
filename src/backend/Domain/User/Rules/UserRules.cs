using System.Text.RegularExpressions;
using Conduit.Domain.Common;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.User.Rules;

public static partial class UserRules
{
    public static UnitResult<RuleError> EmailIsValid(string email)
    {
        if (GeneralRules.EmailIsValid(email))
        {
            return UnitResult.Success<RuleError>();
        }
        else
        {
            return UserErrors.UserEmailIsNotValid();
        }
    }

    public static UnitResult<RuleError> UsernameCanOnlyContainLettersAndNumbers(string username)
    {
        if (ValidUsernameRegEx().IsMatch(username))
        {
            return UnitResult.Success<RuleError>();
        }
        else
        {
            return UserErrors.UsernameIsNotValid();
        }
    }

    [GeneratedRegex("^[a-zA-Z0-9]*$")]
    private static partial Regex ValidUsernameRegEx();
}
