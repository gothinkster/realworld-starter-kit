using Conduit.API.Features.Articles;
using Conduit.API.Features.Users;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Infrastructure;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Article> Articles => Set<Article>();
    public DbSet<User> Users => Set<User>(); 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>(b =>
        {
            b.HasKey(p => p.Id);

            b.Property(p => p.Id)
                .ValueGeneratedOnAdd();
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
}
