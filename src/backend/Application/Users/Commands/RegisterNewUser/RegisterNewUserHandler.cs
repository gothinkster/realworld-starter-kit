using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Common;
using Conduit.Application.Users.Commands.Dtos;
using Conduit.Domain.Common;
using Conduit.Domain.User;
using CSharpFunctionalExtensions;
using CSharpFunctionalExtensions.ValueTasks;
using MediatR;

namespace Conduit.Application.Users.Commands.RegisterNewUser;

public class RegisterNewUserHandler : IRequestHandler<RegisterNewUserCommand, Result<UserDto, Error>>
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
    public async Task<Result<UserDto, Error>> Handle(RegisterNewUserCommand request, CancellationToken cancellationToken = default)
    {
        Result<UserEmail, Error> email = UserEmail.Create(request.Email);
        Result<Username, Error> username = Username.Create(request.Username);

        return await Task.FromResult(Result.Combine<Error>(email, username))
            .Bind(() => User.RegisterNewUser(email.Value, username.Value, request.Password, _usersCounter, _passwordHasher))
            .Map(async (newUser) =>
            {
                await _userRepository.AddAsync(newUser, cancellationToken);
                await _unitOfWork.CommitAsync();

                return new UserDto
                {
                    Email = newUser.Id.Value,
                    Username = newUser.Username.Value,
                    Bio = string.Empty,
                    Image = string.Empty,
                    Token = string.Empty
                };
            });
    }
}
