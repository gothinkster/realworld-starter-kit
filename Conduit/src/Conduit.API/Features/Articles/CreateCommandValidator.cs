using FluentValidation;

namespace Conduit.API.Features.Articles;

public class CreateCommandValidator : AbstractValidator<CreateCommand>
{
    public CreateCommandValidator()
    {
        RuleFor(c => c.Payload.Article.Title)
            .NotEmpty()
            .OverridePropertyName("Article.Title");
    }
}
