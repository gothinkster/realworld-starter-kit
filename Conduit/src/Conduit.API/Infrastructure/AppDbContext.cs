using Conduit.API.Features.Articles;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Conduit.API.Infrastructure;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Article> Articles => Set<Article>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>(b =>
        {
            b.HasKey(p => p.Id);

            b.Property(p => p.Id)
                .ValueGeneratedOnAdd();
        });
    }
}
