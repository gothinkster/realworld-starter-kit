using FluentValidation;

namespace Conduit.API.Features.Comments;

public class ListQueryValidator : AbstractValidator<ListQuery>
{
    public ListQueryValidator()
    {
        RuleFor(c => c.Slug).NotEmpty();
    }
}
