using FluentValidation;

namespace Conduit.API.Features.Articles;

public class FavoriteArticleCommandValidator : AbstractValidator<FavoriteArticleCommand>
{
	public FavoriteArticleCommandValidator()
	{
		RuleFor(s => s.Slug).NotEmpty();
	}
}
