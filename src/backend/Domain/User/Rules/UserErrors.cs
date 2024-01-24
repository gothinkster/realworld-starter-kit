using Conduit.Domain.Common;

namespace Conduit.Domain;

public static class UserErrors
{
    public static RuleError UserEmailIsNotValid()
    {
        return GeneralErrors.ValueIsInvalid(nameof(User.User), $"{nameof(User.User.Id)}(email)");
    }

    public static RuleError UsernameIsNotValid()
    {
        return new()
        {
            ErrorCode = "user.username.is.invalid",
            Message = "Username can only contain letters and number"
        };
    }

    public static RuleError ValidationError(RuleError[]? details)
    {
        return new()
        {
            ErrorCode = "user.validation.error",
            Message = "user validation error",
            Details = details
        };
    }
}
