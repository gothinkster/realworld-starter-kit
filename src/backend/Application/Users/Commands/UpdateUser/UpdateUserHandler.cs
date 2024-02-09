using System;
using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Dtos;
using Conduit.Application.Services;
using Conduit.Application.Users.Dtos;
using Conduit.Domain.Common;
using Conduit.Domain.User;
using CSharpFunctionalExtensions;
using MediatR;

namespace Conduit.Application.Users.Commands.UpdateUser;

public class UpdateUserHandler : IRequestHandler<UpdateUserCommand, Result<UserDto, Error>>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IUsersCounter _usersCounter;
    readonly IUsersRepository _userRepository;
    readonly IPasswordHasher _passwordHasher;
    readonly IAuthenticationService _authenticationService;
    readonly IAuthenticatedUserService _authenticatedUserService;

    public UpdateUserHandler(
        IUnitOfWork unitOfWork,
        IUsersCounter usersCounter,
        IPasswordHasher passwordHasher,
        IUsersRepository userRepository,
        IAuthenticationService authenticationService,
        IAuthenticatedUserService authenticatedUserService)
    {
        _userRepository = userRepository;
        _usersCounter = usersCounter;
        _passwordHasher = passwordHasher;
        _unitOfWork = unitOfWork;
        _authenticationService = authenticationService;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<Result<UserDto, Error>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        AuthenticatedUserDto? authUser = _authenticatedUserService.GetAuthenticatedUser();
        if (authUser == null)
        {
            return Result.Failure<UserDto, Error>(AuthenticationErrors.UserIsNotAuthorized());
        }

        Result<User, Error> user = await Task.FromResult(UserEmail.Create(authUser.EMail))
            .Map(async (authEMail) => await _userRepository.GetByIdAsync(authEMail, cancellationToken));

        if (request.Username != null)
        {
            UnitResult<Error> result = Username.Create(request.Username)
                .Bind((newUsername) => user.Value.ChangeUsername(newUsername, _usersCounter));

        }
        if (request.Email != null)
        {
            UnitResult<Error> result = UserEmail.Create(request.Email)
                .Bind((newEmail) => user.Value.ChangeEMail(newEmail, _usersCounter));
        }
        if (request.Password != null)
        {
            user.Value.ChangePassword(request.Password, _passwordHasher);
        }
        if (request.Image != null)
        {
            user.Value.ChangeImage(request.Image);
        }
        if (request.Bio != null)
        {
            user.Value.ChangeBio(request.Bio);
        }

        return new UserDto
            {
                Email = user.Value.Email.Value,
                Username = user.Value.Username.Value,
                Bio = user.Value.Bio,
                Image = user.Value.Image,
                Token = _authenticationService.GenerateJwtToken(user.Value.Email.Value)
            };
    }
}
