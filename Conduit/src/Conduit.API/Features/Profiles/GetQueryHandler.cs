using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Profiles;

public class GetQueryHandler : IRequestHandler<GetQuery, ProfileResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly ProfileResponseBuilder _responseBuilder;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetQueryHandler(AppDbContext appDbContext,
        ProfileResponseBuilder responseBuilder,
        ICurrentUserAccessor currentUserAccessor)
	{
        _appDbContext = appDbContext;
        _responseBuilder = responseBuilder;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<ProfileResponse> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        var user = await _appDbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);
        if(user == null)
        {
            throw new ResourceNotFoundException("Profile");
        }

        var currentUser = await _appDbContext.Users
            .Include(u => u.Followings)
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == _currentUserAccessor.GetCurrentUserId(), cancellationToken);

        var isFollowing = currentUser?.Followings.Any(u => u.Id == user.Id) ?? false;

        return _responseBuilder.Build(user, isFollowing);
    }
}