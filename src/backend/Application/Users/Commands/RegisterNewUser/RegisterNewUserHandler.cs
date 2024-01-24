using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Common;
using Conduit.Application.Users.Commands.Dtos;
using Conduit.Domain;
using Conduit.Domain.Common;
using Conduit.Domain.User;
using CSharpFunctionalExtensions;
using MediatR;

namespace Conduit.Application.Users.Commands.RegisterNewUser;

public class RegisterNewUserHandler : IRequestHandler<RegisterNewUserCommand, Result<UserDto, RuleError>>
{
    readonly IUnitOfWork _unitOfWork;
    readonly IUsersCounter _usersCounter;
    readonly IUsersRepository _userRepository;
    readonly IPasswordHasher _passwordHasher;

    public RegisterNewUserHandler(IUnitOfWork unitOfWork, IUsersCounter usersCounter, IPasswordHasher passwordHasher, IUsersRepository userRepository)
    {
        _userRepository = userRepository;
        _usersCounter = usersCounter;
        _passwordHasher = passwordHasher;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<UserDto, RuleError>> Handle(RegisterNewUserCommand request, CancellationToken cancellationToken = default)
    {
        Result<User, RuleError> registerUserResult = User.RegisterNewUser(request.Email, request.Username, request.Password, _usersCounter, _passwordHasher);

        if (registerUserResult.IsFailure)
        {
            return Result.Failure<UserDto, RuleError>(registerUserResult.Error);
        }

        await _userRepository.AddAsync(registerUserResult.Value, cancellationToken);
        await _unitOfWork.CommitAsync();

        return new UserDto
        {
            Email = registerUserResult.Value.Id!.Value,
            Username = registerUserResult.Value.Username,
            Bio = string.Empty,
            Image = string.Empty,
            Token = string.Empty
        };
    }
}
