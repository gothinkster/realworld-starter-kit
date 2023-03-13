using Conduit.API.Infrastructure;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Users;

public class UpdateCommandValidator : AbstractValidator<UpdateCommand>
{
    public UpdateCommandValidator(AppDbContext context)
    {
        RuleFor(s => s.UserId).NotEqual(0);

        RuleFor(s => s.Payload.Username)
            .NotEmpty()
            .MustAsync(async (username, cancellationToken) =>
            {
                var existing = await context.Users.Where(u => u.Username == username).AnyAsync(cancellationToken);
                return !existing;
            })
                .WithMessage("User name is already in use.");

        RuleFor(s => s.Payload.Email)
            .NotEmpty()
            .EmailAddress()
            .MustAsync(async (email, cancellationToken) =>
            {
                var existing = await context.Users.Where(u => u.Email == email).AnyAsync(cancellationToken);
                return !existing;
            })
                .WithMessage("Email is already in use.");

        RuleFor(s => s.Payload.Password).NotEmpty();
    }
}
