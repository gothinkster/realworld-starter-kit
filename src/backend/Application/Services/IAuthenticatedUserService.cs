using Conduit.Application.Dtos;

namespace Conduit.Application.Services;

public interface IAuthenticatedUserService
{
    AuthenticatedUserDto? GetAuthenticatedUser();
}
