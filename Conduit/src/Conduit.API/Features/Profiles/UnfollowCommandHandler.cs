using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Profiles;

public class UnfollowCommandHandler : IRequestHandler<UnfollowCommand, ProfileResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly ProfileResponseBuilder _responseBuilder;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public UnfollowCommandHandler(AppDbContext appDbContext,
        ProfileResponseBuilder responseBuilder,
        ICurrentUserAccessor currentUserAccessor)
    {
        _appDbContext = appDbContext;
        _responseBuilder = responseBuilder;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<ProfileResponse> Handle(UnfollowCommand request, CancellationToken cancellationToken)
    {
        var following = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);
        if (following == null)
        {
            throw new ResourceNotFoundException("Profile");
        }

        var currentUser = await _appDbContext.Users
            .Include(u => u.Followings)
            .FirstOrDefaultAsync(u => u.Id == _currentUserAccessor.GetCurrentUserId(), cancellationToken);

        if(currentUser.Followings.Any(f => f.Id == following.Id))
        {
            currentUser.Followings.Remove(following);            
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        return _responseBuilder.Build(following, false);
    }
}