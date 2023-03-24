using Conduit.API.Common.Behaviours;
using Conduit.API.Common.Validators;
using Conduit.API.Features.Articles;
using Conduit.API.Features.Comments;
using Conduit.API.Features.Users;
using Conduit.API.Infrastructure;
using Conduit.API.Infrastructure.Auth;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
var services = builder.Services;

services.AddDbContext<AppDbContext>(
    opt => opt.UseSqlServer(
        configuration.GetConnectionString("ConnectionString")));

services.AddMediatR(
    config => config.RegisterServicesFromAssemblyContaining(typeof(Program)));
services.AddValidatorsFromAssemblyContaining<Program>();

services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

services.AddAutoMapper(Assembly.GetAssembly(typeof(Program))!);
services.AddScoped<IPasswordHasher, PasswordHasher>();
services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
services.AddScoped<ICurrentUserAccessor, CurrentUserAccessor>();
services.AddScoped<IEntityValidationService, EntityValidationService>();
services.AddEntityValidators(Assembly.GetAssembly(typeof(Program))!);
services.AddScoped<ArticleResponseBuilder>();
services.AddScoped<CommentResponseBuilder>();
services.AddScoped<UserResponseBuilder>();

services.AddHttpContextAccessor();

services.AddJwt(configuration);

services.AddControllers((options) => {
    options.Filters.Add<ApiExceptionFilterAttribute>();
});

var app = builder.Build();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
