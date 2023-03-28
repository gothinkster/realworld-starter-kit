using FluentValidation;

namespace Conduit.API.Features.Articles;

public class UnfavouriteArticleCommandValidator : AbstractValidator<UnfavoriteArticleCommand>
{
	public UnfavouriteArticleCommandValidator()
	{
		RuleFor(p => p.Slug).NotEmpty();
	}
}
