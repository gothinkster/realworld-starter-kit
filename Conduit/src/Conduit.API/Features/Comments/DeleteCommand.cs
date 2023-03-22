using FluentValidation;
using MediatR;

namespace Conduit.API.Features.Comments;

public record DeleteCommand(string Slug, int Id) : IRequest;

public class DeleteCommandValidator : AbstractValidator<DeleteCommand>
{
    public DeleteCommandValidator()
    {
        RuleFor(c => c.Slug)
            .NotEmpty();

        RuleFor(c => c.Id)
            .GreaterThan(0);
    }
}
