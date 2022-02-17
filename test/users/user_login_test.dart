import 'dart:convert';
import 'dart:io';

import 'package:dart_shelf_realworld_example_app/app.dart';
import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  final uri = Uri.parse(host + '/users/login');

  HttpServer? server;

  setUp(() async {
    server = await createServer();
  });

  tearDown(() {
    server?.close();
    server = null;
  });

  test('Should return 200', () async {
    final userAndPassword = await registerRandomUser();

    final requestData = {
      'user': {
        'email': userAndPassword.user.email,
        'password': userAndPassword.password
      }
    };

    final response = await post(uri, body: jsonEncode(requestData));

    final responseJson = jsonDecode(response.body);

    final user = UserDto.fromJson(responseJson);

    expect(response.statusCode, 200);
    expect(userAndPassword.user.toJson(), user.toJson());
  });

  test('Given no user should return 401', () async {
    final requestData = {};

    final response = await post(uri, body: jsonEncode(requestData));

    expect(response.statusCode, 401);
  });

  group('email validation', () {
    test('Given no email should return 401', () async {
      final password = faker.internet.password();

      final requestData = {
        'user': {'password': password}
      };

      final response = await post(uri, body: jsonEncode(requestData));

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });

    test('Given empty email should return 401', () async {
      final email = '';
      final password = faker.internet.password();

      final requestData = {
        'user': {'email': email, 'password': password}
      };

      final response = await post(uri, body: jsonEncode(requestData));

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });

    test('Given whitespace email should return 401', () async {
      final email = ' ';
      final password = faker.internet.password();

      final requestData = {
        'user': {'email': email, 'password': password}
      };

      final response = await post(uri, body: jsonEncode(requestData));

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });

    test('Given email does not exist should return 401', () async {
      final email = faker.internet.userName();
      final password = faker.internet.password();

      final requestData = {
        'user': {'email': email, 'password': password}
      };

      final response = await post(uri, body: jsonEncode(requestData));

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

      final response = await post(uri, body: jsonEncode(requestData));

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });

    test('Given password does not match should return 401', () async {
      final userAndPassword = await registerRandomUser();
      final password = faker.internet.password();

      final requestData = {
        'user': {'username': userAndPassword.user.username, 'email': password}
      };

      final response = await post(uri, body: jsonEncode(requestData));

      expect(response.statusCode, 401);
      expect(response.body.isEmpty, true);
    });
  });
}
