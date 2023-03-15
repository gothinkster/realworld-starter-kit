using FluentValidation;

namespace Conduit.API.Features.Articles;

public class UpdateCommandValidator : AbstractValidator<UpdateCommand>
{
    public UpdateCommandValidator()
	{
        RuleFor(a => a.Payload.Article.Title)
            .OptionalArgument();
    }

}