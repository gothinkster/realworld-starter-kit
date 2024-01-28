using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Conduit.Domain.Common;
using Conduit.Domain.User;
using Conduit.Persistence.ContextConfiguration;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.Persistence;

public class SqliteContext : DbContext
{
    readonly IMediator _mediator;

    public DbSet<User> Users { get; set; } = null!;

    public SqliteContext()
    {
        // for ef tools
        _mediator = null!;
    }

    public SqliteContext(DbContextOptions<SqliteContext> options,
        IMediator mediator)
        : base(options)
    {
        _mediator = mediator;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source=conduit.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserEntityTypeConfiguration).Assembly);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // When should you publish domain events?
        //
        // 1. BEFORE calling SaveChangesAsync
        //     - domain events are part of the same transaction
        //     - immediate consistency
        // 2. AFTER calling SaveChangesAsync
        //     - domain events are a separate transaction
        //     - eventual consistency
        //     - handlers can fail
        await PublishNewDomainEvents(cancellationToken);

        return await base.SaveChangesAsync(cancellationToken);
    }

    async Task PublishNewDomainEvents(CancellationToken cancellationToken)
    {
        IDomainEvent[] newDomainEvents = GetNewDomainEvents();

        foreach (IDomainEvent domainEvent in newDomainEvents)
        {
            await _mediator.Publish(domainEvent, cancellationToken);
        }
    }

    IDomainEvent[] GetNewDomainEvents()
    {
        return ChangeTracker
            .Entries<IAggregateRoot>()
            .Select(entry => entry.Entity)
            .SelectMany(entity =>
            {
                IReadOnlyCollection<IDomainEvent> domainEvents = entity.DomainEvents;

                entity.ClearDomainEvents();

                return domainEvents;
            })
            .ToArray();
    }
}
