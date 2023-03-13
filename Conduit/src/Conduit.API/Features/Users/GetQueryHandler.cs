using Conduit.API.Infrastructure;
using Conduit.API.Infrastructure.Auth;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Users;

public class GetQueryHandler : IRequestHandler<GetQuery, UserDTO>
{
    private readonly AppDbContext _dbContext;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public GetQueryHandler(AppDbContext dbContext, 
        IJwtTokenGenerator jwtTokenGenerator)
	{
        _dbContext = dbContext;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<UserDTO> Handle(GetQuery request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.AsNoTracking().Where(u => u.Id == request.userId).FirstOrDefaultAsync(cancellationToken);

        if(user == null)
        {
            throw new ArgumentException("User not found.");
        }

        return new UserDTO
        {
            Bio = user.Bio,
            Email = user.Email,
            Image = user.Image,
            UserName = user.Username,
            Token = await _jwtTokenGenerator.CreateTokenAsync(user.Id, cancellationToken)
        };
    }
}