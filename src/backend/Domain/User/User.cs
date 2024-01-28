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

    public static Result<User, Error> RegisterNewUser(UserEmail email, string username, string clearTextPassword, IUsersCounter usersCounter, IPasswordHasher passwordHasher)
    {
        return CanRegisterNewUser(email, username, clearTextPassword, usersCounter)
            .Match(
                onFailure: error => error,
                onSuccess: () =>
                {
                    string hashedPassword = passwordHasher.HashPassword(clearTextPassword);

                    User newUser = new(email, username, hashedPassword, string.Empty, string.Empty);

                    newUser.AddDomainEvent(new NewUserRegisteredDomainEvent(email.Value, username));

                    return Result.Success<User, Error>(newUser);
                });
    }

    static UnitResult<Error> CanRegisterNewUser(UserEmail email, string username, string clearTextPassword, IUsersCounter usersCounter)
    {
        return Result.Combine(UserErrors.ComposeRegistrationValidationError,
            UserRules.UsernameMustBeProvidedRule(username),
            UserRules.UsernameCanOnlyContainLettersAndNumbersRule(username),
            UserRules.PasswordMustBeOfMinimumLengthRule(clearTextPassword.Length),
            UserRules.PasswordIsNotInBlacklistRule(clearTextPassword),
            UserRules.UsernameMustBeUniqueRule(username, usersCounter),
            UserRules.EmailMustBeUniqueRule(email, usersCounter));
    }

    public UnitResult<Error> ChangePassword(string newClearTextPassword, IPasswordHasher passwordHasher)
    {
        return CanChangePassword(newClearTextPassword, passwordHasher)
            .Match(
                onFailure: error => error,
                onSuccess: () =>
                {
                    HashedPassword = passwordHasher.HashPassword(newClearTextPassword);
                    AddDomainEvent(new PasswordChangedDomainEvent(Username));

                    return UnitResult.Success<Error>();
                });
    }

    UnitResult<Error> CanChangePassword(string newClearTextPassword, IPasswordHasher passwordHasher)
    {
        return Result.Combine(UserErrors.ComposePasswordValidationError,
            UserRules.PasswordMustBeOfMinimumLengthRule(newClearTextPassword.Length),
            UserRules.PasswordIsNotInBlacklistRule(newClearTextPassword));
    }

    public UnitResult<Error> ChangeUsername(string newUsername, IUsersCounter usersCounter)
    {
        return CanChangeUsername(newUsername, usersCounter)
            .Match(
                onFailure: error => error,
                onSuccess: () =>
                {
                    string oldUsername = Username;
                    Username = newUsername;

                    AddDomainEvent(new UsernameChangedDomainEvent(oldUsername, Username));

                    return UnitResult.Success<Error>();
                });
    }

    UnitResult<Error> CanChangeUsername(string newUsername, IUsersCounter usersCounter)
    {
        return Result.Combine(UserErrors.ComposeUsernameValidationError,
            UserRules.UsernameMustBeProvidedRule(newUsername),
            UserRules.UsernameCanOnlyContainLettersAndNumbersRule(newUsername),
            UserRules.UsernameMustBeUniqueRule(newUsername, usersCounter));
    }
}
