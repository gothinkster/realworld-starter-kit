using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Common;
using Conduit.Application.Users.Commands.Dtos;
using Conduit.Domain;
using Conduit.Domain.User;
using MediatR;

namespace Conduit.Application.Users.Commands.RegisterNewUser;

public class RegisterNewUserHandler : IRequestHandler<RegisterNewUserCommand, UserDto>
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
    public async Task<UserDto> Handle(RegisterNewUserCommand request, CancellationToken cancellationToken = default)
    {
        User newUser = User.RegisterNewUser(request.Email, request.Username, request.Password, _usersCounter, _passwordHasher);

        await _userRepository.AddAsync(newUser, cancellationToken);
        await _unitOfWork.CommitAsync();

        return new UserDto
        {
            Email = newUser.Id!.Value,
            Username = newUser.Username,
            Bio = string.Empty,
            Image = string.Empty,
            Token = string.Empty
        };
    }
}
