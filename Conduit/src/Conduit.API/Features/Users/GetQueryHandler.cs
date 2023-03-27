using AutoMapper;
using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using Conduit.API.Infrastructure.Auth;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Users;

public class GetQueryHandler : IRequestHandler<GetQuery, UserResponse>
{
    private readonly AppDbContext _dbContext;
    private readonly UserResponseBuilder _responseBuilder;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetQueryHandler(AppDbContext dbContext,
        UserResponseBuilder responseBuilder,
        ICurrentUserAccessor currentUserAccessor)
    {
        _dbContext = dbContext;
        _responseBuilder = responseBuilder;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<UserResponse> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        if(_currentUserAccessor.UserId is null)
        {
            throw new ResourceNotFoundException(nameof(User));
        }

        var user = await _dbContext.Users.AsNoTracking().Where(u => u.Id == _currentUserAccessor.UserId).FirstOrDefaultAsync(cancellationToken);

        if(user == null)
        {
            throw new ResourceNotFoundException(nameof(User));
        }

        return await _responseBuilder.BuildAsync(user, cancellationToken);
    }
}