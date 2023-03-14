using Conduit.API.Common.Validators;
using Conduit.API.Infrastructure;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Users.Validators;

public class EmailIsUnique : EntityValidatorBase<User>
{
    public EmailIsUnique(AppDbContext appDbContext)
    {
        RuleFor(p => p.Email)
            .MustAsync(async (email, cancellationToken) =>
            {
                var existing = await appDbContext.Users.AsNoTracking().Where(u => u.Email == email).AnyAsync(cancellationToken);
                return !existing;
            }).WithMessage("Email is already in use.");
    }

    public override bool Handle(EntityState state)
    {
        return state == EntityState.Added || state == EntityState.Modified;
    }
}
