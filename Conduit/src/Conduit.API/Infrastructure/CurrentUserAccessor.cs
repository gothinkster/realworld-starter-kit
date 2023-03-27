using Conduit.API.Features.Users;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Conduit.API.Infrastructure;

public class CurrentUserAccessor : ICurrentUserAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly Lazy<int?> _userIdLazy;

    public CurrentUserAccessor(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;

        _userIdLazy = new(() =>
        {
            var claim = _httpContextAccessor.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            if (claim is not null && int.TryParse(claim.Value, out var userId))
            {
                return userId;
            }

            return null;
        });
    }

    public int? UserId => _userIdLazy.Value;

    public int? GetCurrentUserId()
    {
        var claim = _httpContextAccessor.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
        if (claim is not null && int.TryParse(claim.Value, out var userId))
        {
            return userId;
        }

        return null;
    }
}