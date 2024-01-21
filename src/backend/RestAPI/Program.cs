using Conduit.RestAPI.Configuration;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.AddConduitConfiguration();

builder.Services
    .AddConduitServices()
    .AddConduitPersistence()
    .AddConduitMediatR()
    .AddConduitControllers()
    .AddConduitOpenApiSetup();

var app = builder.Build();

app
    .UseConduitPersistence()
    .UseConduitControllers()
    .UseConduitOpenApi();

app.Run();
