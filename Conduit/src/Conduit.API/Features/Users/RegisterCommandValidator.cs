using FluentValidation;

namespace Conduit.API.Features.Users;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(s => s.Payload.Username)
            .NotEmpty();

        RuleFor(s => s.Payload.Email)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .EmailAddress();

        RuleFor(s => s.Payload.Password)
            .NotEmpty();
    }
}
