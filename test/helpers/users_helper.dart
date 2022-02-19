import 'dart:convert';

import 'package:corsac_jwt/corsac_jwt.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:http/http.dart';
import 'package:test/test.dart';

import '../test_fixtures.dart';
import 'auth_helper.dart';
import 'user_and_password.dart';

Uri registerUserUri() {
  return Uri.parse(host + '/users');
}

Future<Response> registerUser(
    {required String username,
    required String email,
    required String password}) async {
  final requestData = {
    'user': {'username': username, 'email': email, 'password': password}
  };

  return await post(registerUserUri(), body: jsonEncode(requestData));
}

Future<UserAndPassword> registerUserAndDecode(
    {required String username,
    required String email,
    required String password}) async {
  final response =
      await registerUser(username: username, email: email, password: password);

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

Future<UserAndPassword> registerRandomUser() async {
  final username = faker.internet.userName();
  final email = faker.internet.email();
  final password = faker.internet.password();

  return await registerUserAndDecode(
      username: username, email: email, password: password);
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

Uri userLoginUri() {
  return Uri.parse(host + '/users/login');
}

Uri getCurrentUserUri() {
  return Uri.parse(host + '/user');
}

Future<Response> loginUser(String email, String password) async {
  final requestData = {
    'user': {'email': email, 'password': password}
  };

  return await post(userLoginUri(), body: jsonEncode(requestData));
}

Future<UserDto> loginUserAndDecode(String email, String password) async {
  final response = await loginUser(email, password);

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  final user = UserDto.fromJson(responseJson);

  return user;
}

Future<UserDto> getCurrentUser(String token) async {
  final response =
      await get(getCurrentUserUri(), headers: makeAuthorizationHeader(token));

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  final user = UserDto.fromJson(responseJson);

  return user;
}

Uri updateUserUri() {
  return Uri.parse(host + '/user');
}

Future<Response> updateUser(
    {required String token,
    String? username,
    String? email,
    String? password,
    String? bio,
    String? image}) async {
  final requestData = {'user': {}};

  if (username != null) {
    requestData['user']?['username'] = username;
  }

  if (email != null) {
    requestData['user']?['email'] = email;
  }

  if (password != null) {
    requestData['user']?['password'] = password;
  }

  if (bio != null) {
    requestData['user']?['bio'] = bio;
  }

  if (image != null) {
    requestData['user']?['image'] = image;
  }

  return await put(updateUserUri(),
      headers: makeAuthorizationHeader(token), body: jsonEncode(requestData));
}

Future<UserDto> updateUserAndDecode(
    {required String token,
    String? username,
    String? email,
    String? password,
    String? bio,
    String? image}) async {
  final response = await updateUser(
      token: token,
      username: username,
      email: email,
      password: password,
      bio: bio,
      image: image);

  expect(response.statusCode, 200);

  final responseJson = jsonDecode(response.body);

  return UserDto.fromJson(responseJson);
}
