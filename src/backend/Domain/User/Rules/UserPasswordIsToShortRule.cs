namespace Conduit.Domain.User.Rules;

public class UserPasswordIsToShortRule : IBusinessRule
{
    const int MinimumPasswordLenght = 4;

    readonly int _passwordLength;

    public UserPasswordIsToShortRule(int passwordLength)
    {
        _passwordLength = passwordLength;
    }

    public string Message => $"Password must have at least {MinimumPasswordLenght} characters";

    public bool IsBroken()
    {
        return _passwordLength < MinimumPasswordLenght;
    }
}
