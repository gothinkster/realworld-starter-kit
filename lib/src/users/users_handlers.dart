import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/already_exists_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/argument_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/jwt_service.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_service.dart';
import 'package:shelf/shelf.dart';

import 'model/user.dart';

class UsersHandlers {
  final UsersService usersService;
  final JwtService jwtService;

  UsersHandlers({required this.usersService, required this.jwtService});

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

    User user;

    try {
      user = await usersService.createUser(username, email, password);
    } on ArgumentException catch (e) {
      return Response(422, body: jsonEncode(ErrorDto(errors: [e.message])));
    } on AlreadyExistsException catch (e) {
      return Response(409, body: jsonEncode(ErrorDto(errors: [e.message])));
    }

    final token = jwtService.getToken(user);

    final userDto =
        UserDto(username: user.username, email: user.email, token: token);

    return Response(201, body: jsonEncode(userDto));
  }

  Future<Response> loginUserHandler(Request request) async {
    final requestBody = await request.readAsString();
    final requestData = json.decode(requestBody);

    final userData = requestData['user'];
    final email = userData['email'];
    final password = userData['password'];

    if (email == null) {
      return Response(401);
    }

    if (password == null) {
      return Response(401);
    }

    final user = await usersService.getUserByEmailAndPassword(email, password);

    if (user == null) {
      return Response(401);
    }

    final token = jwtService.getToken(user);

    final userDto = UserDto(
        username: user.username,
        email: user.email,
        token: token,
        bio: user.bio,
        image: user.image);

    return Response.ok(jsonEncode(userDto));
  }
}
