using System;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Conduit.Application.Dtos;
using Conduit.Application.Users.Dtos;
using Conduit.Application.Users.Repositories;
using Conduit.Domain.User;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Conduit.Application.Services;

public class AuthenticationService : IAuthenticationService
{
    readonly IUsersQueryRepository _usersQueryRepository;
    readonly IPasswordHasher _passwordHasher;
    readonly IOptions<JwtOptions> _jwtOptions;

    public AuthenticationService(
        IUsersQueryRepository usersQueryRepository,
        IPasswordHasher passwordHasher,
        IOptions<JwtOptions> jwtOptions)
    {
        _usersQueryRepository = usersQueryRepository;
        _passwordHasher = passwordHasher;
        _jwtOptions = jwtOptions;
    }

    public async Task<bool> ValidateLoginAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        LoginDto? persistedLogin = await _usersQueryRepository.FindLoginByEmailAsync(email, cancellationToken);
        if (persistedLogin == null)
        {
            return false;
        }

        return _passwordHasher.VerifyPassword(password, persistedLogin.HashedPassword);
    }

    public string GenerateJwtToken(string email)
    {
        Claim[] claims =
        [
            new(JwtRegisteredClaimNames.Sub, email)
        ];
        ClaimsIdentity identity = new(claims);

        SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_jwtOptions.Value.SigningKey));
        SigningCredentials signingCredentials = new(key, SecurityAlgorithms.HmacSha256);

        DateTime expiresAt = DateTime.UtcNow.AddSeconds(_jwtOptions.Value.ExpirationSeconds);

        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = identity,
            Issuer = _jwtOptions.Value.Issuer,
            Audience = _jwtOptions.Value.Audience,
            Expires = expiresAt,
            SigningCredentials = signingCredentials
        };

        return new JsonWebTokenHandler()
            .CreateToken(tokenDescriptor);
    }
}
