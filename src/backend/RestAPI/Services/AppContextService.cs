using System.Linq;
using System.Security.Claims;
using Conduit.Application.Dtos;
using Conduit.Application.Services;
using Microsoft.AspNetCore.Http;

namespace Conduit.RestAPI;

public class AppContextService : IAuthenticatedUserService
{
    readonly IHttpContextAccessor _httpContextAccessor;

    public AppContextService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    public AuthenticatedUserDto? GetAuthenticatedUser()
    {
        ClaimsPrincipal? user = _httpContextAccessor.HttpContext?.User;
        if (user == null)
        {
            return null;
        }

        string id = user.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

        return new AuthenticatedUserDto
        {
            UserId = id
        };
    }
}
