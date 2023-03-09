using Conduit.API.Common.Behaviours;
using Conduit.API.Infrastructure;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
var services = builder.Services;

services.AddMediatR(
    config => config.RegisterServicesFromAssemblyContaining(typeof(Program)));
services.AddValidatorsFromAssemblyContaining<Program>();

services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

services.AddDbContext<AppDbContext>(
    opt => opt.UseSqlServer(
        configuration.GetConnectionString("ConnectionString")));

services.AddControllers();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
