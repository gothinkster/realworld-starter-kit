using System.Linq;
using Conduit.Domain.Common;
using Conduit.Domain.User.Events;
using Conduit.Domain.User.Rules;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.User;

public class User : AggregateRoot<UserEmail>
{
    public string Username { get; private set; }
    public string HashedPassword { get; private set; }
    public string Bio { get; }
    public string Image { get; }

    User(UserEmail id, string username, string hashedPassword, string bio, string image) : base(id)
    {
        Username = username;
        HashedPassword = hashedPassword;
        Bio = bio;
        Image = image;
    }

    public static Result<User, RuleError> RegisterNewUser(string email, string username, string clearTextPassword, IUsersCounter usersCounter, IPasswordHasher passwordHasher)
    {
        Result<UserEmail, RuleError> emailResult = UserEmail.Create(email);

        UnitResult<RuleError>[] checkResult =
        [
            emailResult,
            UserRules.UsernameCanOnlyContainLettersAndNumbers(username)
            //Result<UserEmail, RuleError> userEmailResult = newUser.CheckRule(new UserEmailMustBeUniqueRule(id, usersCounter))
            //newUser.CheckRule(new UsernameMustBeProvidedRule(username));
            //newUser.CheckRule(new UserPasswordIsToShortRule(clearTextPassword.Length));
            //newUser.CheckRule(new UserPasswordIsBlacklistedRule(clearTextPassword));
            //newUser.CheckRule(new UsernameMustBeUniqueRule(username, usersCounter));
        ];
        RuleError[] errors = checkResult.Where(c => c.IsFailure).Select(c => c.Error).ToArray();

        if (errors.Length > 0)
        {
            return Result.Failure<User, RuleError>(UserErrors.ValidationError(errors));
        }

        string hashedPassword = passwordHasher.HashPassword(clearTextPassword);

        User newUser = new(emailResult.Value, username, hashedPassword, string.Empty, string.Empty);

        newUser.AddDomainEvent(new NewUserRegisteredDomainEvent(emailResult.Value.Value, username));

        return newUser;
    }

    public void ChangePassword(string newClearTextPassword, IPasswordHasher passwordHasher)
    {
        //CheckRule(new UserPasswordIsToShortRule(newClearTextPassword.Length));
        //CheckRule(new UserPasswordIsBlacklistedRule(newClearTextPassword));

        HashedPassword = passwordHasher.HashPassword(newClearTextPassword);

        AddDomainEvent(new PasswordChangedDomainEvent(Username));
    }

    public void ChangeUsername(string newUsername, IUsersCounter usersCounter)
    {
        //CheckRule(new UsernameMustBeProvidedRule(newUsername));
        //CheckRule(new UsernameCanOnlyContainLettersAndNumbersRule(newUsername));
        //CheckRule(new UsernameMustBeUniqueRule(newUsername, usersCounter));

        string oldUsername = Username;
        Username = newUsername;

        AddDomainEvent(new UsernameChangedDomainEvent(oldUsername, Username));
    }
}
