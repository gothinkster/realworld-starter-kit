import 'dart:convert';
import 'dart:io';

import 'package:corsac_jwt/corsac_jwt.dart';
import 'package:dart_shelf_realworld_example_app/app.dart';
import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../test_utils.dart';

void main() {
  late HttpServer server;

  setUp(() async {
    server = await createServer();
  });

  tearDown(() {
    server.close();
  });

  test('Should return 201', () async {
    final username = faker.internet.userName();
    final email = faker.internet.email();
    final password = faker.internet.password();

    final requestData = {
      'user': {'username': username, 'email': email, 'password': password}
    };

    final uri = Uri.parse(host + '/users');

    final response = await post(uri, body: jsonEncode(requestData));

    final responseJson = jsonDecode(response.body);

    final userDto = UserDto.fromJson(responseJson);

    final decodedToken = JWT.parse(userDto.token);
    final decodedTokenUser = decodedToken.claims['user'];

    expect(response.statusCode, 201);
    expect(userDto.username, username);
    expect(userDto.email, email);
    expect(decodedTokenUser, {'username': username});
    expect(userDto.bio, null);
    expect(userDto.image, null);
  });

  group('username validation', () {
    test('Given no username should return 422', () async {
      final email = faker.internet.email();
      final password = faker.internet.password();

      final requestData = {
        'user': {'email': email, 'password': password}
      };

      final uri = Uri.parse(host + '/users');

      final response = await post(uri, body: jsonEncode(requestData));

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(response.statusCode, 422);
      expect(errorDto.errors[0], 'username is required');
    });
  });

  group('email validation', () {
    test('Given no email should return 422', () async {
      final username = faker.internet.userName();
      final password = faker.internet.password();

      final requestData = {
        'user': {'username': username, 'password': password}
      };

      final uri = Uri.parse(host + '/users');

      final response = await post(uri, body: jsonEncode(requestData));

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(response.statusCode, 422);
      expect(errorDto.errors[0], 'email is required');
    });

    test('Given invalid email should return 422', () async {
      final username = faker.internet.userName();
      final email = 'foo@';
      final password = faker.internet.password();

      final requestData = {
        'user': {'username': username, 'email': email, 'password': password}
      };

      final uri = Uri.parse(host + '/users');

      final response = await post(uri, body: jsonEncode(requestData));

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(response.statusCode, 422);
      expect(errorDto.errors[0], 'Invalid email: $email');
    });
  });

  group('password validation', () {
    test('Given no password should return 422', () async {
      final username = faker.internet.userName();
      final email = faker.internet.email();

      final requestData = {
        'user': {'username': username, 'email': email}
      };

      final uri = Uri.parse(host + '/users');

      final response = await post(uri, body: jsonEncode(requestData));

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(response.statusCode, 422);
      expect(errorDto.errors[0], 'password is required');
    });
  });
}
