import 'package:http/http.dart';
import 'package:test/test.dart';

import '../helpers/auth_helper.dart';
import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  test('Should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final user = await getCurrentUser(userAndPassword.user.token);

    expect(user.toJson(), userAndPassword.user.toJson());
  });

  group('authorization', () {
    test('Given no authorization header should return 401', () async {
      final response = await get(getCurrentUserUri());

      expect(response.statusCode, 401);
    });

    test('Given invalid authorization header should return 401', () async {
      final headers = {'Authorization': 'invalid'};
      final response = await get(getCurrentUserUri(), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given no token should return 401', () async {
      final headers = {'Authorization': 'Token '};
      final response = await get(getCurrentUserUri(), headers: headers);

      expect(response.statusCode, 401);
    });

    test('Given user is not found should return 401', () async {
      final email = faker.internet.email();
      final token = makeToken(email);

      final headers = {'Authorization': 'Token $token'};

      final response = await get(getCurrentUserUri(), headers: headers);

      expect(response.statusCode, 401);
    });
  });
}
