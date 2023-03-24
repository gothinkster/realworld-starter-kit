using FluentValidation;

namespace Conduit.API.Features.Profiles;

public class FollowCommandValidator : AbstractValidator<FollowCommand>
{
	public FollowCommandValidator()
	{
		RuleFor(p => p.Username).NotEmpty();
	}
}
