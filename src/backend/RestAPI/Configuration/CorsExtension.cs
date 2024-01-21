using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Conduit.RestAPI.Configuration;

static class CorsExtension
{
    public static IServiceCollection AddConduitCors(this IServiceCollection services)
    {
        services.AddCors(options =>
            options.AddPolicy(name: "CorsPolicy", builder =>
                builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()));

        return services;
    }

    public static WebApplication UseConduitCors(this WebApplication app)
    {
        app.UseCors("CorsPolicy");

        return app;
    }
}
