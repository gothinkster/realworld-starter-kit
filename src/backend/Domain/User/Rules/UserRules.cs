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

    public static UnitResult<Error> EmailMustBeUniqueRule(UserEmail email, IUsersCounter usersCounter)
    {
        if (usersCounter.CountUsersWithEmailAsync(email).GetAwaiter().GetResult() == 0)
        {
            return UnitResult.Success<Error>();
        }
        else
        {
            return UserErrors.EmailIsNotUnique();
        }
    }

    public static UnitResult<Error> EmailIsValidRule(string email)
    {
        if (Common.Rules.EmailIsValidRule(email))
        {
            return UnitResult.Success<Error>();
        }
        else
        {
            return UserErrors.UserEmailIsNotValid();
        }
    }

    public static UnitResult<Error> UsernameMustBeUniqueRule(Username username, IUsersCounter usersCounter)
    {
        if (usersCounter.CountUsersWithUsernameAsync(username).GetAwaiter().GetResult() == 0)
        {
            return UnitResult.Success<Error>();
        }
        else
        {
            return UserErrors.UsernameIsNotUnique();
        }
    }

    public static UnitResult<Error> UsernameMustBeProvidedRule(string username)
    {
        if (string.IsNullOrEmpty(username))
        {
            return UserErrors.UsernameIsNotProvided();
        }
        else
        {
            return UnitResult.Success<Error>();
        }
    }

    public static UnitResult<Error> UsernameCanOnlyContainLettersAndNumbersRule(string username)
    {
        if (ValidUsernameRegEx().IsMatch(username))
        {
            return UnitResult.Success<Error>();
        }
        else
        {
            return UserErrors.UsernameIsNotValid();
        }
    }

    public static UnitResult<Error> PasswordMustBeOfMinimumLengthRule(int passwordLength)
    {
        if (passwordLength >= MinimumPasswordLenght)
        {
            return UnitResult.Success<Error>();
        }
        else
        {
            return UserErrors.PasswordIsToShort();
        }
    }

    public static UnitResult<Error> PasswordIsNotInBlacklistRule(string clearTextPassword)
    {
        if (BlacklistedPasswords.Contains(clearTextPassword, StringComparer.InvariantCultureIgnoreCase))
        {
            return UserErrors.PasswordIsBlacklisted();
        }
        else
        {
            return UnitResult.Success<Error>();
        }
    }

    [GeneratedRegex("^[a-zA-Z0-9]*$")]
    private static partial Regex ValidUsernameRegEx();
}
