using System.Collections.Generic;
using System.Linq;
using Conduit.Domain.Common;

namespace Conduit.Domain.User.Rules;

static class UserErrors
{
    public static Error UserEmailIsNotValid()
    {
        return Errors.ValueIsInvalid(nameof(User), $"{nameof(User.Id)}(email)");
    }

    public static Error EmailIsNotUnique()
    {
        return new()
        {
            ErrorCode = "user.id.is.not.unique",
            Message = "Email must be unique"
        };
    }

    public static Error UsernameIsNotProvided()
    {
        return new()
        {
            ErrorCode = "user.username.is.not.provided",
            Message = "Username must be provieded"
        };
    }

    public static Error UsernameIsNotValid()
    {
        return new()
        {
            ErrorCode = "user.username.is.invalid",
            Message = "Username may only contain letters and number"
        };
    }

    public static Error UsernameIsNotUnique()
    {
        return new()
        {
            ErrorCode = "user.username.is.not.unique",
            Message = "Username must be unique"
        };
    }

    public static Error PasswordIsToShort()
    {
        return new()
        {
            ErrorCode = "user.password.is.to.short",
            Message = $"Password must have at least {UserRules.MinimumPasswordLenght} characters"
        };
    }

    public static Error PasswordIsBlacklisted()
    {
        return new()
        {
            ErrorCode = "user.password.is.blacklisted",
            Message = "The chosen password is blacklisted"
        };
    }

    public static ErrorWithDetails RegistrationIsNotValidError(Error[] details)
    {
        return new()
        {
            ErrorCode = "user.registration.is.invalid",
            Message = "Provided user registration is invalid",
            Details = details
        };
    }

    public static ErrorWithDetails PasswordIsNotValidError(Error[] details)
    {
        return new()
        {
            ErrorCode = "user.password.is.invalid",
            Message = "Provided password is invalid",
            Details = details
        };
    }

    public static ErrorWithDetails UsernameIsNotValidError(Error[] details)
    {
        return new()
        {
            ErrorCode = "user.username.is.invalid",
            Message = "Provided username is invalid",
            Details = details
        };
    }

    public static Error ComposeRegistrationValidationError(IEnumerable<Error> errors)
    {
        return RegistrationIsNotValidError(errors.ToArray());
    }

    public static Error ComposePasswordValidationError(IEnumerable<Error> errors)
    {
        return PasswordIsNotValidError(errors.ToArray());
    }

    public static Error ComposeUsernameValidationError(IEnumerable<Error> errors)
    {
        return UsernameIsNotValidError(errors.ToArray());
    }
}
