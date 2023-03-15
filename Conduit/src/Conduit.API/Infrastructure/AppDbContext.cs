using Conduit.API.Common.Validators;
using Conduit.API.Features.Articles;
using Conduit.API.Features.Users;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Conduit.API.Infrastructure;

public class AppDbContext : DbContext
{
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public AppDbContext(DbContextOptions options, 
        IServiceScopeFactory serviceScopeFactory) 
        : base(options)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    public DbSet<Article> Articles => Set<Article>();
    public DbSet<User> Users => Set<User>();

    public override int SaveChanges()
    {
        // It is hard for me to handle both sync and async. 
        throw new NotSupportedException();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        var entityEntries = ChangeTracker.Entries()
           .Where(e => e.State is EntityState.Added or EntityState.Modified)
           .ToList();

        foreach (var entityEntry in entityEntries)
        {
            await ValidateEntityAsync(entityEntry, cancellationToken);
        }

        return await base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>(b =>
        {
            b.HasKey(p => p.Id);

            b.Property(p => p.Id)
                .ValueGeneratedOnAdd();

            b.HasOne(p => p.Author)
                .WithMany()
                .HasForeignKey(p => p.AuthorId);
        });

        modelBuilder.Entity<User>(b =>
        {
            b.HasKey(p => p.Id);

            b.Property(p => p.Id)
                .ValueGeneratedOnAdd();

            b.HasIndex(p => p.Username)
                .IsUnique();

            b.HasIndex(p => p.Email)
                .IsUnique();
                
        });
    }

    private async Task ValidateEntityAsync(EntityEntry entityEntry, CancellationToken cancellationToken)
    {
        var scope = _serviceScopeFactory.CreateScope();
        var entityValidationService = scope.ServiceProvider.GetRequiredService<IEntityValidationService>();
        var entityType = entityEntry.Metadata.ClrType;

        var methodInfo = entityValidationService.GetType().GetMethod(nameof(entityValidationService.ValidateAsync));
        var methodConstructed = methodInfo!.MakeGenericMethod(entityType);

        object[] args = { entityEntry.Entity, entityEntry.State, cancellationToken };
        var result = await (Task<ValidationResult?>)methodConstructed.Invoke(entityValidationService, args)!;

        if (!result!.IsValid)
        {
            throw new ValidationException(result.Errors);
        }
    }
}
