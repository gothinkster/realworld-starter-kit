using Conduit.API.Common.Extensions;
using Conduit.API.Infrastructure;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class CreateCommandValidator : AbstractValidator<CreateCommand>
{
    private readonly AppDbContext _context;

    public CreateCommandValidator(AppDbContext context)
    {
        _context = context;

        RuleFor(c => c.Payload.Title)
            .NotEmpty()
            .MustAsync(BeUnique).WithMessage("The specified title already exists.");
    }
    
    private async Task<bool> BeUnique(string title, CancellationToken cancellationToken)
    {
        var existing = await _context.Articles.AnyAsync(a => a.Title == title, cancellationToken);
        return !existing;
    }
}
