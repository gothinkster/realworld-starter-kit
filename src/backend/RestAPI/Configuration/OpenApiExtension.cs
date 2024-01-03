using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Conduit.RestAPI.Configuration;

static class OpenApiExtension
{
    public static IServiceCollection AddConduitOpenApiSetup(this IServiceCollection services)
    {
        services.AddSwaggerGen(x =>
        {
            x.IncludeXmlComments(XmlCommentsFilePath);
            x.SupportNonNullableReferenceTypes();
            x.SchemaFilter<OpenApiNonNullableFalseFilter>();
            x.SchemaFilter<OpenApiRequiredMemberFilter>();
            x.EnableAnnotations();

            x.AddSecurityDefinition(
                "Bearer",
                new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    BearerFormat = "JWT"
                }
            );

            x.AddSecurityRequirement(
                new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                }
            );
            x.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "RealWorld Conduit API",
                Version = "1.0.0",
                Description = "Conduit API documentation",
                Contact = new OpenApiContact
                {
                    Name = "RealWorld",
                    Url = new Uri("https://www.realworld.how")
                },
                License = new OpenApiLicense
                {
                    Name = "MIT License",
                    Url = new Uri("https://opensource.org/licenses/MIT")
                }
            });
            //x.CustomSchemaIds(y => y.FullName);
        });

        return services;
    }

    public static WebApplication UseConduitOpenApi(this WebApplication app)
    {
        app.UseSwagger(c =>
        {
            c.RouteTemplate = "api-docs/{documentName}/openapi.json";
            c.PreSerializeFilters.Add((swagger, httpReq) =>
            {
                swagger.Servers = new List<OpenApiServer> { new OpenApiServer { Url = $"{httpReq.Scheme}://{httpReq.Host.Value}/api" } };
            });
        });

        if (app.Environment.IsDevelopment())
        {
            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = "api-docs";
                c.SwaggerEndpoint("v1/openapi.json", "RealWorld API V1");
            });
        }

        return app;
    }

    private static string XmlCommentsFilePath
    {
        get
        {
            string basePath = AppContext.BaseDirectory;
            string fileName = typeof(Program).Assembly.GetName().Name + ".xml";
            return Path.Combine(basePath, fileName);
        }
    }
}