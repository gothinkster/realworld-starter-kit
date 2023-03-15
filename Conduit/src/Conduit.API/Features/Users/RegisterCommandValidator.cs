using FluentValidation;

namespace Conduit.API.Features.Users;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(s => s.Payload.User.Username)
            .NotEmpty()
            .OverridePropertyName("User.Username");

        RuleFor(s => s.Payload.User.Email)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .EmailAddress()
            .OverridePropertyName("User.Email");

        RuleFor(s => s.Payload.User.Password)
            .NotEmpty()
            .OverridePropertyName("User.Password");
    }
}
