using System;
using Conduit.Domain.Common;
using Conduit.Domain.User.Events;
using Conduit.Domain.User.Rules;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.User;

public class User : AggregateRoot<string>
{
    public override string Id
    {
        get => Email.Value;
        protected set
        {
            UserEmail.Create(value)
                .Match(
                    onSuccess: (userEmail) => Email = userEmail,
                    onFailure: (error) => throw new ArgumentException("The persisted email is invalid", "Email")
                );
        }
    }
    public UserEmail Email { get; protected set; }
    public Username Username { get; protected set; }
    public string HashedPassword { get; private set; }
    public string Bio { get; }
    public string Image { get; }

#pragma warning disable CS8618 // Ein Non-Nullable-Feld muss beim Beenden des Konstruktors einen Wert ungleich NULL enthalten. Erwägen Sie die Deklaration als Nullable.
    User()
    {
        //for ef only
    }
#pragma warning restore CS8618 // Ein Non-Nullable-Feld muss beim Beenden des Konstruktors einen Wert ungleich NULL enthalten. Erwägen Sie die Deklaration als Nullable.

    User(UserEmail userEmail, Username username, string hashedPassword, string bio, string image)
    {
        Email = userEmail;
        Username = username;
        HashedPassword = hashedPassword;
        Bio = bio;
        Image = image;
    }

    public static Result<User, Error> RegisterNewUser(UserEmail email, Username username, string clearTextPassword, IUsersCounter usersCounter, IPasswordHasher passwordHasher)
    {
        return CanRegisterNewUser(email, username, clearTextPassword, usersCounter)
            .Match(
                onFailure: error => error,
                onSuccess: () =>
                {
                    string hashedPassword = passwordHasher.HashPassword(clearTextPassword);

                    User newUser = new(email, username, hashedPassword, string.Empty, string.Empty);

                    newUser.AddDomainEvent(new NewUserRegisteredDomainEvent(email.Value, username.Value));

                    return Result.Success<User, Error>(newUser);
                });
    }

    static UnitResult<Error> CanRegisterNewUser(UserEmail email, Username username, string clearTextPassword, IUsersCounter usersCounter)
    {
        return Result.Combine(
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
                    AddDomainEvent(new PasswordChangedDomainEvent(Username.Value));

                    return UnitResult.Success<Error>();
                });
    }

    static UnitResult<Error> CanChangePassword(string newClearTextPassword, IPasswordHasher passwordHasher)
    {
        return Result.Combine(
            UserRules.PasswordMustBeOfMinimumLengthRule(newClearTextPassword.Length),
            UserRules.PasswordIsNotInBlacklistRule(newClearTextPassword));
    }

    public UnitResult<Error> ChangeUsername(Username newUsername, IUsersCounter usersCounter)
    {
        return CanChangeUsername(newUsername, usersCounter)
            .Match(
                onFailure: error => error,
                onSuccess: () =>
                {
                    string oldUsername = Username.Value;
                    Username = newUsername;

                    AddDomainEvent(new UsernameChangedDomainEvent(oldUsername, Username.Value));

                    return UnitResult.Success<Error>();
                });
    }

    static UnitResult<Error> CanChangeUsername(Username newUsername, IUsersCounter usersCounter)
    {
        return UserRules.UsernameMustBeUniqueRule(newUsername, usersCounter);
    }
}
