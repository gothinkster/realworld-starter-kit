using System.Collections.Generic;
using System.Linq;
using Conduit.Domain.Common;

namespace Conduit.Domain.User.Rules;

static class UserErrors
{
    public static RuleError UserEmailIsNotValid()
    {
        return GeneralErrors.ValueIsInvalid(nameof(User), $"{nameof(User.Id)}(email)");
    }

    public static RuleError EmailIsNotUnique()
    {
        return new()
        {
            ErrorCode = "user.id.is.not.unique",
            Message = "Email must be unique"
        };
    }

    public static RuleError UsernameIsNotProvided()
    {
        return new()
        {
            ErrorCode = "user.username.is.not.provided",
            Message = "Username must be provieded"
        };
    }

    public static RuleError UsernameIsNotValid()
    {
        return new()
        {
            ErrorCode = "user.username.is.invalid",
            Message = "Username may only contain letters and number"
        };
    }

    public static RuleError UsernameIsNotUnique()
    {
        return new()
        {
            ErrorCode = "user.username.is.not.unique",
            Message = "Username must be unique"
        };
    }

    public static RuleError ValidationError(RuleError[]? details)
    {
        return new()
        {
            ErrorCode = "user.validation.error",
            Message = "user validation failed",
            Details = details
        };
    }

    public static RuleError PasswordIsToShort()
    {
        return new()
        {
            ErrorCode = "user.password.is.to.short",
            Message = $"Password must have at least {UserRules.MinimumPasswordLenght} characters"
        };
    }

    public static RuleError PasswordIsBlacklisted()
    {
        return new()
        {
            ErrorCode = "user.password.is.blacklisted",
            Message = "The chosen password is blacklisted"
        };
    }

    public static RuleError ComposeRuleError(IEnumerable<RuleError> errors)
    {
        return ValidationError(errors.ToArray());
    }
}
