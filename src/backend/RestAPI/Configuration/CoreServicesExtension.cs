using Conduit.Application.Services;
using Conduit.Application.Users.Repositories;
using Conduit.Domain.Common;
using Conduit.Domain.User;
using Conduit.Persistence;
using Conduit.Persistence.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Conduit.RestAPI.Configuration;

static class CoreServicesExtension
{
    public static IServiceCollection AddConduitServices(this IServiceCollection services)
    {
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<IAuthenticatedUserService, AppContextService>();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IUsersCounter, SqliteUsersCounter>();
        services.AddScoped<IUsersRepository, SqliteUsersRepository>();
        services.AddScoped<IUsersQueryRepository, SqliteUsersQueryRepository>();
        services.AddScoped<IUnitOfWork, SqliteUnitOfWork>();

        return services;
    }
}
