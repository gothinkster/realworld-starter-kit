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
        return new(
            errorCode: "user.id.is.not.unique",
            message: "Email must be unique"
        );
    }

    public static Error UsernameIsNotProvided()
    {
        return new(
            errorCode: "user.username.is.not.provided",
            message: "Username must be provieded"
        );
    }

    public static Error UsernameIsNotValid()
    {
        return new(
            errorCode: "user.username.is.invalid",
            message: "Username may only contain letters and number"
        );
    }

    public static Error UsernameIsNotUnique()
    {
        return new(
            errorCode: "user.username.is.not.unique",
            message: "Username must be unique"
        );
    }

    public static Error PasswordIsToShort()
    {
        return new(
            errorCode: "user.password.is.to.short",
            message: $"Password must have at least {UserRules.MinimumPasswordLenght} characters"
        );
    }

    public static Error PasswordIsBlacklisted()
    {
        return new(
            errorCode: "user.password.is.blacklisted",
            message: "The chosen password is blacklisted"
        );
    }
}
