import 'package:corsac_jwt/corsac_jwt.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/unauthorized_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_service.dart';

class AuthService {
  final String issuer;
  final String secretKey;
  final UsersService usersService;

  AuthService(
      {required this.secretKey,
      required this.issuer,
      required this.usersService});

  Future<String> getToken(String username, String password) async {
    if (await usersService.verifyPassword(username, password)) {
      final builder = JWTBuilder()
        ..issuer = issuer
        ..expiresAt = DateTime.now().add(Duration(seconds: 86400))
        ..setClaim('user', {'username': username});

      final signer = JWTHmacSha256Signer(secretKey);

      final token = builder.getSignedToken(signer);

      return token.toString();
    } else {
      throw UnauthorizedException();
    }
  }
}
