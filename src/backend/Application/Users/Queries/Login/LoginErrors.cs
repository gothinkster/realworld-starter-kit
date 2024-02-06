using Conduit.Domain.Common;

namespace Conduit.Application.Users.Queries.Login;

static class LoginErrors
{
    public static Error LoginIsInvalid()
    {
        return new(
            errorCode: "login.is.invalid",
            message: "Login is invalid");
    }
}
