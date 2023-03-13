using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Conduit.API.Infrastructure.Auth;

public class JwtTokenGenerator : IJwtTokenGenerator
{
    private readonly JwtIssuerOptions _jwtOptions;

    public JwtTokenGenerator(IOptions<JwtIssuerOptions> jwtOptions)
    {
        _jwtOptions = jwtOptions.Value;
    }

    public async Task<string> CreateTokenAsync(int userId, CancellationToken cancellationToken)
    {
        var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),

                new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator(cancellationToken)),
                new Claim(JwtRegisteredClaimNames.Iat,
                    new DateTimeOffset(_jwtOptions.IssuedAt).ToUnixTimeSeconds().ToString(),
                    ClaimValueTypes.Integer64)
            };
        var jwt = new JwtSecurityToken(
            _jwtOptions.Issuer,
            _jwtOptions.Audience,
            claims,
            _jwtOptions.NotBefore,
            _jwtOptions.Expiration,
            _jwtOptions.SigningCredentials);

        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
        
        return encodedJwt;
    }
}