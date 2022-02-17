import 'package:dart_shelf_realworld_example_app/src/users/jwt_service.dart';

import '../test_fixtures.dart';

Map<String, String> makeAuthorizationHeader(String token) {
  return {'Authorization': 'Token $token'};
}

String makeToken(String email) {
  final jwtService = JwtService(issuer: issuer, secretKey: secretKey);
  return jwtService.getToken(email);
}
