import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/auth/auth_service.dart';
import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_service.dart';
import 'package:shelf/shelf.dart';

class UsersHandlers {
  final UsersService usersService;
  final AuthService authService;

  UsersHandlers({required this.usersService, required this.authService});

  Future<Response> registerUserHandler(Request request) async {
    final requestBody = await request.readAsString();
    final requestData = json.decode(requestBody);

    final userData = requestData['user'];
    final username = userData['username'];
    final email = userData['email'];
    final password = userData['password'];

    if (username == null) {
      return Response(422,
          body: jsonEncode(ErrorDto(errors: ['username is required'])));
    }

    if (email == null) {
      return Response(422,
          body: jsonEncode(ErrorDto(errors: ['email is required'])));
    }

    if (password == null) {
      return Response(422,
          body: jsonEncode(ErrorDto(errors: ['password is required'])));
    }

    final user = await usersService.createUser(username, email, password);

    final token = await authService.getToken(username, password);

    final userDto = UserDto(
        username: user.username,
        email: user.email,
        token: token,
        bio: user.bio,
        image: user.image);

    return Response(201, body: jsonEncode(userDto));
  }
}
