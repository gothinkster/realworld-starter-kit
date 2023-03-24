using FluentValidation;

namespace Conduit.API.Features.Profiles;

public class UnfollowCommandValidator : AbstractValidator<UnfollowCommand>
{
    public UnfollowCommandValidator()
    {
        RuleFor(p => p.Username).NotEmpty();
    }
}
