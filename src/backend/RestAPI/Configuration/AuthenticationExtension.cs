using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Conduit.RestAPI.Configuration;

static class AuthenticationExtension
{
    public static IServiceCollection AddConduitAuthenticationSetup(this IServiceCollection services,
            ConfigurationManager config)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = config["JWT:Issuer"],
                        ValidAudience = config["JWT:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:SigningKey"]!))
                    };
                    options.Events = new JwtBearerEvents()
                    {
                        // this code strips out "Token" from the header
                        // due to Conduit spec saying "Token" instead of "Bearer"
                        OnMessageReceived = ctx =>
                        {
                            if (ctx.Request.Headers.ContainsKey("Authorization"))
                            {
                                string authHeader = ctx.Request.Headers["Authorization"].ElementAt(0)!;
                                string? token = authHeader.StartsWith("Token ") ? authHeader.Substring(6) : authHeader;
                                ctx.Token = token;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

        return services;
    }

    public static WebApplication UseConduitAuthentication(this WebApplication app)
    {
        app
            .UseAuthentication();

        return app;
    }

    public static WebApplication UseConduitAuthorization(this WebApplication app)
    {
        app
            .UseAuthorization();

        return app;
    }
}
