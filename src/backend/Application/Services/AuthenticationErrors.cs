using Conduit.Domain.Common;

namespace Conduit.Application.Services;

static class AuthenticationErrors
{
    public static Error UserIsNotAuthorized()
    {
        return new(
            errorCode: "user.is.not.authorized",
            message: "The user is not authorized"
        );
    }
}
