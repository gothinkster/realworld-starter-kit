using Conduit.API.Common.Validators;
using Conduit.API.Infrastructure;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Users.Validators;

public sealed class UsernameIsUnique : EntityValidatorBase<User>
{
    private readonly AppDbContext _appDbContext;

    public UsernameIsUnique(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;

        RuleFor(p => p.Username)
            .MustAsync(async (username, cancellationToken) =>
            {
                var existing = await _appDbContext.Users.AsNoTracking().Where(u => u.Username == username).AnyAsync(cancellationToken);
                return !existing;
            }).WithMessage("User name is already in use.");
    }

    public override bool Handle(EntityState state)
    {
        return state == EntityState.Added || state == EntityState.Modified;
    }
}
