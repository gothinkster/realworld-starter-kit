using FluentValidation;

namespace Conduit.API.Features.Users;

public class UpdateCommandValidator : AbstractValidator<UpdateCommand>
{
    public UpdateCommandValidator()
    {
        RuleFor(s => s.Payload.User.Username)
            .OptionalArgument();

        RuleFor(s => s.Payload.User.Email)
            .Cascade(CascadeMode.Stop)
            .OptionalArgument()
            .EmailAddress();

        RuleFor(s => s.Payload.User.Password)
            .OptionalArgument();
    }
}
