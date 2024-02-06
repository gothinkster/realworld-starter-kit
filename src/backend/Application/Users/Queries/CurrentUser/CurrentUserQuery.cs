using Conduit.Application.Users.Dtos;
using Conduit.Domain.Common;
using CSharpFunctionalExtensions;
using MediatR;

namespace Conduit.Application.Users.Queries.CurrentUser;

public class CurrentUserQuery : IRequest<Result<UserDto, Error>>
{

}
