using FluentValidation;

namespace Conduit.API.Features.Profiles;

public class GetQueryValidator : AbstractValidator<GetQuery>
{
	public GetQueryValidator()
	{
		RuleFor(p => p.Username).NotEmpty();
	}
}
