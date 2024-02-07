using System;
using System.Threading;
using System.Threading.Tasks;
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

    public Task<Result<UserDto, Error>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
