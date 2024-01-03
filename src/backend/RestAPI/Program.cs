using Conduit.RestAPI.Configuration;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.AddConduitConfiguration();

builder.Services
    .AddConduitControllers()
    .AddConduitOpenApiSetup();

var app = builder.Build();

app
    .UseConduitControllers()
    .UseConduitOpenApi();

app.Run();