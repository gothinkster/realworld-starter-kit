using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Dtos;
using Conduit.Application.Services;
using Conduit.Application.Users.Dtos;
using Conduit.Domain;
using Conduit.Domain.Common;
using Conduit.Domain.User;
using CSharpFunctionalExtensions;
using CSharpFunctionalExtensions.ValueTasks;
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

        UserId id = UserId.Create(authUser.UserId);

        return await Task.FromResult(Result.Success<User, Error>(await _userRepository.GetByIdAsync(id, cancellationToken)))
            .Finally((userResult) =>
                userResult.Check((user) =>
                    Result.Combine(
                        userResult.CheckIf(request.Username != null, (user) => Username.Create(request.Username!)
                            .Bind((newUsername) => user.ChangeUsername(newUsername, _usersCounter))),
                        userResult.CheckIf(request.Email != null, (user) => UserEmail.Create(request.Email!)
                            .Bind((newEmail) => user.ChangeEMail(newEmail, _usersCounter))),
                        userResult.CheckIf(request.Password != null, (user) => user.ChangePassword(request.Password!, _passwordHasher)))))
            .TapIf(request.Image != null, (user) => user.ChangeImage(request.Image!))
            .TapIf(request.Bio != null, (user) => user.ChangeBio(request.Bio!))
            .Map(async (user) =>
            {
                await _unitOfWork.CommitAsync();

                return new UserDto
                {
                    Id = user.Id.Value,
                    Email = user.Email.Value,
                    Username = user.Username.Value,
                    Bio = user.Bio,
                    Image = user.Image,
                    Token = _authenticationService.GenerateJwtToken(user.Id.Value)
                };
            });
    }
}
