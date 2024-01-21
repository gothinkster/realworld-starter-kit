using Conduit.Application.Common;
using Conduit.Domain;
using Conduit.Domain.User;
using Conduit.Persistence;
using Conduit.Persistence.Users;
using Microsoft.Extensions.DependencyInjection;


namespace Conduit.RestAPI.Configuration;

static class CoreServicesExtension
{
    public static IServiceCollection AddConduitServices(this IServiceCollection services)
    {
        services.AddScoped<IUsersCounter, SqliteUsersCounter>();
        services.AddScoped<IUsersRepository, SqliteUsersRepository>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IUnitOfWork, SqliteUnitOfWork>();

        return services;
    }
}
