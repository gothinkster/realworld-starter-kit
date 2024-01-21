
using Conduit.Application.Users.Commands.RegisterNewUser;
using Microsoft.Extensions.DependencyInjection;

namespace Conduit.RestAPI.Configuration;

static class MediatRExtension
{
    public static IServiceCollection AddConduitMediatR(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(RegisterNewUserCommand).Assembly));

        return services;
    }
}
