import 'package:corsac_jwt/corsac_jwt.dart';

import 'model/user.dart';

class JwtService {
  final String issuer;
  final String secretKey;

  JwtService({required this.issuer, required this.secretKey});

  String getToken(User user) {
    final builder = JWTBuilder()
      ..issuer = issuer
      ..expiresAt = DateTime.now().add(Duration(seconds: 86400))
      ..setClaim('user', {'username': user.username});

    final signer = JWTHmacSha256Signer(secretKey);

    final token = builder.getSignedToken(signer);

    return token.toString();
  }
}
