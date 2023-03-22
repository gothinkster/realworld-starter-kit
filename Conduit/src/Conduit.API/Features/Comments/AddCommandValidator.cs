using FluentValidation;

namespace Conduit.API.Features.Comments;

public class AddCommandValidator : AbstractValidator<AddCommand>
{
    public AddCommandValidator()
    {
        RuleFor(c => c.Payload.Comment.Body)
            .NotEmpty()
            .OverridePropertyName("Comment.Body");
    }
}
