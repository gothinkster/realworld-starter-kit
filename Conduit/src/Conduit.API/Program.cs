using Conduit.API.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
var services = builder.Services;

services.AddDbContext<AppDbContext>(
    opt => opt.UseSqlServer(
        configuration.GetConnectionString("ConnectionString")));

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
