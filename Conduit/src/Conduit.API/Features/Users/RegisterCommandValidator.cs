using FluentValidation;

namespace Conduit.API.Features.Users;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(s => s.Payload.User.Username)
            .NotEmpty();

        RuleFor(s => s.Payload.User.Email)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .EmailAddress();

        RuleFor(s => s.Payload.User.Password)
            .NotEmpty();
    }
}
