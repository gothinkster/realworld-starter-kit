using FluentValidation;

namespace Conduit.API.Features.Users;

public class UpdateCommandValidator : AbstractValidator<UpdateCommand>
{
    public UpdateCommandValidator()
    {
        RuleFor(s => s.Payload.User.Username)
            .OptionalArgument()
            .OverridePropertyName("User.Username");

        RuleFor(s => s.Payload.User.Email)
            .Cascade(CascadeMode.Stop)
            .OptionalArgument()
            .EmailAddress()
            .OverridePropertyName("User.Email");

        RuleFor(s => s.Payload.User.Password)
            .OptionalArgument()
            .OverridePropertyName("User.Password");
    }
}
