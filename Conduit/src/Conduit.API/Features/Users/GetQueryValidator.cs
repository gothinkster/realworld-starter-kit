using FluentValidation;

namespace Conduit.API.Features.Users;

public class GetQueryValidator : AbstractValidator<GetQuery>
{
	public GetQueryValidator()
	{
		RuleFor(p => p.Username).NotEmpty();
	}
}
