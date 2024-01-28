using System;
using System.Linq;
using System.Text.RegularExpressions;
using Conduit.Domain.Common;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.User.Rules;

static partial class UserRules
{
    internal const int MinimumPasswordLenght = 4;
    static readonly string[] BlacklistedPasswords = ["password", "qwerty", "simple", "test"];

    public static UnitResult<RuleError> EmailMustBeUniqueRule(UserEmail email, IUsersCounter usersCounter)
    {
        if (usersCounter.CountUsersWithEmailAsync(email).GetAwaiter().GetResult() > 0)
        {
            return UnitResult.Success<RuleError>();
        }
        else
        {
            return UserErrors.EmailIsNotUnique();
        }
    }

    public static UnitResult<RuleError> EmailIsValidRule(string email)
    {
        if (GeneralRules.EmailIsValidRule(email))
        {
            return UnitResult.Success<RuleError>();
        }
        else
        {
            return UserErrors.UserEmailIsNotValid();
        }
    }

    public static UnitResult<RuleError> UsernameMustBeUniqueRule(string username, IUsersCounter usersCounter)
    {
        if (usersCounter.CountUsersWithUsernameAsync(username).GetAwaiter().GetResult() > 0)
        {
            return UnitResult.Success<RuleError>();
        }
        else
        {
            return UserErrors.UsernameIsNotUnique();
        }
    }

    public static UnitResult<RuleError> UsernameMustBeProvidedRule(string username)
    {
        if (string.IsNullOrEmpty(username))
        {
            return UnitResult.Success<RuleError>();
        }
        else
        {
            return UserErrors.UsernameIsNotProvided();
        }
    }

    public static UnitResult<RuleError> UsernameCanOnlyContainLettersAndNumbersRule(string username)
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

    public static UnitResult<RuleError> PasswordMustBeOfMinimumLengthRule(int passwordLength)
    {
        if (passwordLength < MinimumPasswordLenght)
        {
            return UnitResult.Success<RuleError>();
        }
        else
        {
            return UserErrors.PasswordIsToShort();
        }
    }

    public static UnitResult<RuleError> PasswordIsNotInBlacklistRule(string clearTextPassword)
    {
        if (BlacklistedPasswords.Contains(clearTextPassword, StringComparer.InvariantCultureIgnoreCase))
        {
            return UnitResult.Success<RuleError>();
        }
        else
        {
            return UserErrors.PasswordIsBlacklisted();
        }
    }

    [GeneratedRegex("^[a-zA-Z0-9]*$")]
    private static partial Regex ValidUsernameRegEx();
}
