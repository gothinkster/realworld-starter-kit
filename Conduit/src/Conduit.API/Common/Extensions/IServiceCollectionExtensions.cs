using Conduit.API.Infrastructure.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection;

public static class IServiceCollectionExtensions
{
    public static void AddJwt(this IServiceCollection services, IConfiguration config)
    {
        services.AddOptions();

        var authSettings = config.GetSection(nameof(AuthSettings));
        services.Configure<AuthSettings>(authSettings);

        var authSettingsOption = new AuthSettings();
        authSettings.Bind(authSettingsOption);

        var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(authSettingsOption.SecretKey));
        var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        services.Configure<JwtIssuerOptions>(options =>
        {
            options.Issuer = authSettingsOption.Issuer;
            options.Audience = authSettingsOption.Audience;
            options.SigningCredentials = signingCredentials;
        });

        var tokenValidationParameters = new TokenValidationParameters
        {
            // The signing key must match!
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = signingCredentials.Key,

            // Validate the JWT Issuer (iss) claim
            ValidateIssuer = true,
            ValidIssuer = authSettingsOption.Issuer,

            // Validate the JWT Audience (aud) claim
            ValidateAudience = true,
            ValidAudience = authSettingsOption.Audience,

            // Validate the token expiry
            ValidateLifetime = true,

            // If you want to allow a certain amount of clock drift, set that here:
            ClockSkew = TimeSpan.Zero
        };

        services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = tokenValidationParameters;
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = (context) =>
                    {
                        var token = context.HttpContext.Request.Headers["Authorization"];

                        if(token.Count == 0)
                        {
                            return Task.CompletedTask;
                        }

                        var tokenString = token[0] ?? string.Empty;
                        if(!tokenString.StartsWith("Token", StringComparison.OrdinalIgnoreCase))
                        {
                            return Task.CompletedTask;
                        }

                        context.Token = tokenString["Token ".Length..].Trim();
                        return Task.CompletedTask;
                    }
                };

            });
    }
}
