using System;
using System.Linq;

namespace Conduit.Domain.User.Rules;

public class UserPasswordIsBlacklistedRule : IBusinessRule
{
    static readonly string[] BlacklistedPasswords = ["password", "qwerty", "simple", "test"];

    readonly bool _isBlacklisted;

    public UserPasswordIsBlacklistedRule(string clearTextPassword)
    {
        _isBlacklisted = BlacklistedPasswords.Contains(clearTextPassword, StringComparer.InvariantCultureIgnoreCase);
    }

    public string Message => "The chosen password is blacklisted";

    public bool IsBroken()
    {
        return _isBlacklisted;
    }
}
