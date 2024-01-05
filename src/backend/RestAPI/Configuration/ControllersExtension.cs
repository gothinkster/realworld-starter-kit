using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Conduit.RestAPI.Configuration;

static class ControllersExtension
{
    public static IServiceCollection AddConduitControllers(this IServiceCollection services)
    {
        services.AddControllers()
            .AddJsonOptions(opt => opt.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);

        return services;
    }

    public static WebApplication UseConduitControllers(this WebApplication app)
    {
        app
            .UsePathBase("/api")
            .UseRouting();

        app.MapControllers();

        return app;
    }
}
