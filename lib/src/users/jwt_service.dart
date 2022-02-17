import 'package:corsac_jwt/corsac_jwt.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_token_claim.dart';

class JwtService {
  final String issuer;
  late JWTHmacSha256Signer signer;

  JwtService({required this.issuer, required String secretKey}) {
    signer = JWTHmacSha256Signer(secretKey);
  }

  String getToken(String email) {
    final builder = JWTBuilder()
      ..issuer = issuer
      ..setClaim('user', UserTokenClaim(email: email).toJson());

    final token = builder.getSignedToken(signer);

    return token.toString();
  }

  UserTokenClaim? getUserTokenClaim(String token) {
    final decodedToken = JWT.parse(token);

    if (!decodedToken.verify(signer)) {
      return null;
    }

    return UserTokenClaim.fromJson(decodedToken.getClaim('user'));
  }
}
