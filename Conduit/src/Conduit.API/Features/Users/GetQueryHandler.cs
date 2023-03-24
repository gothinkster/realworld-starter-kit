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

    public GetQueryHandler(AppDbContext dbContext,
        UserResponseBuilder responseBuilder)
    {
        _dbContext = dbContext;
        _responseBuilder = responseBuilder;
    }

    public async Task<UserResponse> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.AsNoTracking().Where(u => u.Id == request.userId).FirstOrDefaultAsync(cancellationToken);

        if(user == null)
        {
            throw new ResourceNotFoundException(nameof(User));
        }

        return await _responseBuilder.BuildAsync(user, cancellationToken);
    }
}