import 'dart:convert';

import 'package:http/http.dart';
import 'package:test/test.dart';

import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  test('Should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final user = await loginUserAndDecode(
        userAndPassword.user.email, userAndPassword.password);

    expect(userAndPassword.user.toJson(), user.toJson());
  });

  test('Given no user should return 401', () async {
    final requestData = {};

    final response = await post(userLoginUri(), body: jsonEncode(requestData));

    expect(response.statusCode, 401);
  });

  group('email validation', () {
    test('Given no email should return 401', () async {
      final password = faker.internet.password();

      final requestData = {
        'user': {'password': password}
      };

      final response =
          await post(userLoginUri(), body: jsonEncode(requestData));

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });

    test('Given empty email should return 401', () async {
      final email = '';
      final password = faker.internet.password();

      final requestData = {
        'user': {'email': email, 'password': password}
      };

      final response =
          await post(userLoginUri(), body: jsonEncode(requestData));

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });

    test('Given whitespace email should return 401', () async {
      final email = ' ';
      final password = faker.internet.password();

      final requestData = {
        'user': {'email': email, 'password': password}
      };

      final response =
          await post(userLoginUri(), body: jsonEncode(requestData));

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });

    test('Given email does not exist should return 401', () async {
      final email = faker.internet.userName();
      final password = faker.internet.password();

      final response = await loginUser(email, password);

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });
  });

  group('password validation', () {
    test('Given no password should return 401', () async {
      final username = faker.internet.userName();

      final requestData = {
        'user': {'username': username}
      };

      final response =
          await post(userLoginUri(), body: jsonEncode(requestData));

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });

    test('Given password does not match should return 401', () async {
      final userAndPassword = await registerRandomUser();
      final password = faker.internet.password();

      final response = await loginUser(userAndPassword.user.email, password);

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });
  });
}
