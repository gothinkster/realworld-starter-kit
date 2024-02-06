using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Services;
using Conduit.Application.Users.Dtos;
using Conduit.Application.Users.Repositories;
using Conduit.Domain.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Conduit.Application.Users.Queries.Login;

public class LoginHandler : IRequestHandler<LoginQuery, Result<UserDto, Error>>
{
    readonly IAuthenticationService _authenticationService;
    readonly IUsersQueryRepository _usersQueryRepository;

    public LoginHandler(
        IAuthenticationService authenticationService,
        IUsersQueryRepository usersQueryRepository)
    {
        _authenticationService = authenticationService;
        _usersQueryRepository = usersQueryRepository;
    }

    public async Task<Result<UserDto, Error>> Handle(LoginQuery request, CancellationToken cancellationToken = default)
    {
        string emailLowerCase = request.Email.ToLower();
        bool loginIsValid = await _authenticationService.ValidateLoginAsync(emailLowerCase, request.Password, cancellationToken);

        if (!loginIsValid)
        {
            return Result.Failure<UserDto, Error>(LoginErrors.LoginIsInvalid());
        }

        UserDto user = await _usersQueryRepository.GetByEmailAsync(emailLowerCase, cancellationToken);
        user.Token = _authenticationService.GenerateJwtToken(user.Email);

        return user;
    }
}
