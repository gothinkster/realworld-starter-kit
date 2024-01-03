using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace Conduit.RestAPI.Configuration;

static class ConfigurationExtension
{
    public static WebApplicationBuilder AddConduitConfiguration(this WebApplicationBuilder builder)
    {
        builder.Configuration
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
            .AddUserSecrets<Program>()
            .AddEnvironmentVariables();

        return builder;
    }
}