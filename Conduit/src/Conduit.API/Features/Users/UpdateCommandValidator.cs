using FluentValidation;

namespace Conduit.API.Features.Users;

public class UpdateCommandValidator : AbstractValidator<UpdateCommand>
{
    public UpdateCommandValidator()
    {
        RuleFor(s => s.Payload.Username)
            .OptionalArgument();

        RuleFor(s => s.Payload.Email)
            .Cascade(CascadeMode.Stop)
            .OptionalArgument()
            .EmailAddress();

        RuleFor(s => s.Payload.Password)
            .OptionalArgument();
    }
}
