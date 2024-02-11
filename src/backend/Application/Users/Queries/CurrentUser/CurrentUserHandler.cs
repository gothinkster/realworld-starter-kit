using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Dtos;
using Conduit.Application.Services;
using Conduit.Application.Users.Dtos;
using Conduit.Application.Users.Repositories;
using Conduit.Domain.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Conduit.Application.Users.Queries.CurrentUser;

public class CurrentUserHandler : IRequestHandler<CurrentUserQuery, Result<UserDto, Error>>
{
    readonly IAuthenticationService _authenticationService;
    readonly IUsersQueryRepository _usersQueryRepository;
    readonly IAuthenticatedUserService _authenticatedUserService;

    public CurrentUserHandler(
        IAuthenticationService authenticationService,
        IAuthenticatedUserService authenticatedUserService,
        IUsersQueryRepository usersQueryRepository)
    {
        _authenticationService = authenticationService;
        _authenticatedUserService = authenticatedUserService;
        _usersQueryRepository = usersQueryRepository;
    }

    public async Task<Result<UserDto, Error>> Handle(CurrentUserQuery request, CancellationToken cancellationToken)
    {
        AuthenticatedUserDto? authUser = _authenticatedUserService.GetAuthenticatedUser();
        if (authUser == null)
        {
            return Result.Failure<UserDto, Error>(AuthenticationErrors.UserIsNotAuthorized());
        }

        UserDto user = await _usersQueryRepository.GetByIdAsync(authUser.UserId, cancellationToken);
        user.Token = _authenticationService.GenerateJwtToken(user.Id);

        return user;
    }
}
