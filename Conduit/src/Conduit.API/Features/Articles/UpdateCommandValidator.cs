using Conduit.API.Infrastructure;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class UpdateCommandValidator : AbstractValidator<UpdateCommand>
{
    private readonly AppDbContext _context;

    public UpdateCommandValidator(AppDbContext context)
	{
        _context = context;

        RuleFor(a => a.Payload.Title)
            .NotEmpty()
            .MustAsync(BeUnique).WithMessage("The specified title already exists.");
    }

    private async Task<bool> BeUnique(string? title, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            return false;
        }

        var existing = await _context.Articles.AnyAsync(a => a.Title == title, cancellationToken);
        return !existing;
    }
}