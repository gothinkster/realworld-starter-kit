import 'package:dart_shelf_realworld_example_app/src/users/jwt_service.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_handlers.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_service.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class AppRouter {
  // Routes without the starting slash
  static List<String> routesRequiringAuthorization = ['api/user'];

  late UsersHandlers _usersHandlers;

  AppRouter(
      {required JwtService jwtService, required UsersService usersService}) {
    _usersHandlers =
        UsersHandlers(jwtService: jwtService, usersService: usersService);
  }

  Handler get router {
    final router = Router();

    router.post('/api/users', _usersHandlers.registerUserHandler);
    router.post('/api/users/login', _usersHandlers.loginUserHandler);
    router.get('/api/user', _usersHandlers.getCurrentUserHandler);
    router.put('/api/user', _usersHandlers.updateUserHandler);

    return router;
  }
}
