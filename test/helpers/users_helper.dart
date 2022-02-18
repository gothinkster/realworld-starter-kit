import 'dart:convert';

import 'package:corsac_jwt/corsac_jwt.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../test_fixtures.dart';
import 'auth_helper.dart';
import 'user_and_password.dart';

Future<UserAndPassword> registerRandomUser() async {
  final username = faker.internet.userName();
  final email = faker.internet.email();
  final password = faker.internet.password();

  final requestData = {
    'user': {'username': username, 'email': email, 'password': password}
  };

  final uri = Uri.parse(host + '/users');

  final response = await post(uri, body: jsonEncode(requestData));

  expect(response.statusCode, 201);

  final responseJson = jsonDecode(response.body);

  final user = UserDto.fromJson(responseJson);

  final decodedToken = JWT.parse(user.token);
  final decodedTokenUser = decodedToken.claims['user'];

  expect(user.username, username);
  expect(user.email, email);
  expect(decodedTokenUser, {'email': user.email});
  expect(user.bio, null);
  expect(user.image, null);

  return UserAndPassword(user: user, password: password);
}

Future<UserAndPassword> registerRandomUserAndUpdateBioAndImage() async {
  final userAndPassword = await registerRandomUser();

  final uri = Uri.parse(host + '/user');

  final bio = faker.job.title();
  final image = faker.internet.httpsUrl();

  final requestData = {
    'user': {'bio': bio, 'image': image}
  };

  final headers = makeAuthorizationHeader(userAndPassword.user.token);

  final response =
      await put(uri, headers: headers, body: jsonEncode(requestData));

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  final updatedUser = UserDto.fromJson(responseJson);

  return UserAndPassword(user: updatedUser, password: userAndPassword.password);
}

Future<UserDto> getCurrentUser(String token) async {
  final uri = Uri.parse(host + '/user');

  final response = await get(uri, headers: makeAuthorizationHeader(token));

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  final user = UserDto.fromJson(responseJson);

  return user;
}
