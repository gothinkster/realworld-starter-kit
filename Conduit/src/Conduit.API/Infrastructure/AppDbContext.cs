using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }
}
