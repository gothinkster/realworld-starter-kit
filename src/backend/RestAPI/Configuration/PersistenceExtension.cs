using Conduit.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Conduit.RestAPI.Configuration;

static class PersistenceExtension
{
    public static IServiceCollection AddConduitPersistence(this IServiceCollection services)
    {
        services.AddDbContext<SqliteContext>();

        return services;
    }

    public static WebApplication UseConduitPersistence(this WebApplication app)
    {
        using (IServiceScope serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            SqliteContext context = serviceScope.ServiceProvider.GetService<SqliteContext>()!;
            context.Database.Migrate();
        }

        return app;
    }
}
