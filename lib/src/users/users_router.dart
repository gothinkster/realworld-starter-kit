import 'dart:convert';

import 'package:dart_shelf_realworld_example_app/src/common/errors/dtos/error_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/already_exists_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/common/exceptions/argument_exception.dart';
import 'package:dart_shelf_realworld_example_app/src/common/middleware/authorize.dart';
import 'package:dart_shelf_realworld_example_app/src/users/dtos/user_dto.dart';
import 'package:dart_shelf_realworld_example_app/src/users/jwt_service.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_service.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import 'model/user.dart';

class UsersRouter {
  final UsersService usersService;
  final JwtService jwtService;

  UsersRouter({required this.usersService, required this.jwtService});

  Future<Response> _registerUserHandler(Request request) async {
    final requestBody = await request.readAsString();
    final requestData = json.decode(requestBody);

    final userData = requestData['user'];

    if (userData == null) {
      return Response(422,
          body: jsonEncode(ErrorDto(errors: ['user is required'])));
    }

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

    final token = jwtService.getToken(user.email);

    final userDto =
        UserDto(username: user.username, email: user.email, token: token);

    return Response(201, body: jsonEncode(userDto));
  }

  Future<Response> _loginUserHandler(Request request) async {
    final requestBody = await request.readAsString();
    final requestData = json.decode(requestBody);

    final userData = requestData['user'];

    if (userData == null) {
      return Response(401);
    }

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

    final token = jwtService.getToken(user.email);

    final userDto = UserDto(
        username: user.username,
        email: user.email,
        token: token,
        bio: user.bio,
        image: user.image);

    return Response.ok(jsonEncode(userDto));
  }

  Future<Response> _getCurrentUserHandler(Request request) async {
    final user = request.context['user'] as User;

    final token = jwtService.getToken(user.email);

    final userDto = UserDto(
        username: user.username,
        email: user.email,
        token: token,
        bio: user.bio,
        image: user.image);

    return Response.ok(jsonEncode(userDto));
  }

  Future<Response> _updateUserHandler(Request request) async {
    final user = request.context['user'] as User;

    final requestBody = await request.readAsString();
    final requestData = json.decode(requestBody);

    final userData = requestData['user'];
    final username = userData['username'];
    final emailForUpdate = userData['email'];
    final password = userData['password'];
    final bio = userData['bio'];
    final image = userData['image'];

    final updatedUser = await usersService.updateUserByEmail(user.email,
        username: username,
        emailForUpdate: emailForUpdate,
        password: password,
        bio: bio,
        image: image);

    final token = jwtService.getToken(updatedUser.email);

    final userDto = UserDto(
        username: updatedUser.username,
        email: updatedUser.email,
        token: token,
        bio: updatedUser.bio,
        image: updatedUser.image);

    return Response.ok(jsonEncode(userDto));
  }

  Handler get router {
    final router = Router();

    router.post('/users', _registerUserHandler);

    router.post('/users/login', _loginUserHandler);

    router.get(
        '/user',
        Pipeline()
            .addMiddleware(authorize(usersService, jwtService))
            .addHandler(_getCurrentUserHandler));

    router.put(
        '/user',
        Pipeline()
            .addMiddleware(authorize(usersService, jwtService))
            .addHandler(_updateUserHandler));

    return router;
  }
}
