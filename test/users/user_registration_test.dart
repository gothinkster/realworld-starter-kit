import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../helpers/users_helper.dart';
import '../test_fixtures.dart';

void main() {
  test('Should return 201', () async {
    await registerRandomUser();
  });

  test('Given no user should return 422', () async {
    final requestData = {};

    final response =
        await post(registerUserUri(), body: jsonEncode(requestData));

    expect(response.statusCode, 422);

    final responseJson = jsonDecode(response.body);

    final errorDto = ErrorDto.fromJson(responseJson);

    expect(errorDto.errors[0], 'user is required');
  });

  group('username validation', () {
    test('Given no username should return 422', () async {
      final email = faker.internet.email();
      final password = faker.internet.password();

      final requestData = {
        'user': {'email': email, 'password': password}
      };

      final response =
          await post(registerUserUri(), body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'username is required');
    });

    test('Given empty username should return 422', () async {
      final username = '';
      final email = faker.internet.email();
      final password = faker.internet.password();

      final response = await registerUser(
          username: username, email: email, password: password);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'username cannot be blank');
    });

    test('Given whitespace username should return 422', () async {
      final username = ' ';
      final email = faker.internet.email();
      final password = faker.internet.password();

      final response = await registerUser(
          username: username, email: email, password: password);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'username cannot be blank');
    });
  });

  group('email validation', () {
    test('Given no email should return 422', () async {
      final username = faker.internet.userName();
      final password = faker.internet.password();

      final requestData = {
        'user': {'username': username, 'password': password}
      };

      final response =
          await post(registerUserUri(), body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'email is required');
    });

    test('Given empty email should return 422', () async {
      final username = faker.internet.userName();
      final email = ' ';
      final password = faker.internet.password();

      final response = await registerUser(
          username: username, email: email, password: password);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'Invalid email: $email');
    });

    test('Given whitespace email should return 422', () async {
      final username = faker.internet.userName();
      final email = ' ';
      final password = faker.internet.password();

      final response = await registerUser(
          username: username, email: email, password: password);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'Invalid email: $email');
    });

    test('Given invalid email should return 422', () async {
      final username = faker.internet.userName();
      final email = 'foo@';
      final password = faker.internet.password();

      final response = await registerUser(
          username: username, email: email, password: password);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'Invalid email: $email');
    });

    test('Given email already exists should return 409', () async {
      final userAndPassword = await registerRandomUser();

      final username = faker.internet.userName();
      final password = faker.internet.password();

      final response = await registerUser(
          username: username,
          email: userAndPassword.user.email,
          password: password);

      expect(response.statusCode, 409);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'Email is taken');
    });
  });

  group('password validation', () {
    test('Given no password should return 422', () async {
      final username = faker.internet.userName();
      final email = faker.internet.email();

      final requestData = {
        'user': {'username': username, 'email': email}
      };

      final response =
          await post(registerUserUri(), body: jsonEncode(requestData));

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0], 'password is required');
    });

    test('Given password length is less than 8 should return 422', () async {
      final username = faker.internet.userName();
      final email = faker.internet.email();
      final password = 'abcdefg';

      final response = await registerUser(
          username: username, email: email, password: password);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0],
          'Password length must be greater than or equal to 8');
    });

    test('Given password length is greater than 64 should return 422',
        () async {
      final username = faker.internet.userName();
      final email = faker.internet.email();
      final password =
          'xcXzfXLMuJ6rZOimrcelA1CTDaptfowQFUAOHYBcAfUr5gJmhmw0paBulNt78RL34';

      final response = await registerUser(
          username: username, email: email, password: password);

      expect(response.statusCode, 422);

      final responseJson = jsonDecode(response.body);

      final errorDto = ErrorDto.fromJson(responseJson);

      expect(errorDto.errors[0],
          'Password length must be less than or equal to 64');
    });
  });
}
