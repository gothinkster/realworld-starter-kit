using System.Security.Claims;

namespace Conduit.API.Infrastructure;

public class CurrentUserAccessor : ICurrentUserAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserAccessor(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int GetCurrentUserId()
    {
        var claim = _httpContextAccessor.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
        if (claim is not null && int.TryParse(claim.Value, out var userId))
        {
            return userId;
        }

        return 0;
    }
}