import 'package:dart_shelf_realworld_example_app/src/users/jwt_service.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_service.dart';
import 'package:shelf/shelf.dart';

Middleware authorize(UsersService usersService, JwtService jwtService,
        List<String> routesRequiringAuthorization) =>
    (innerHandler) {
      return (request) async {
        var isAuthorizationRequired =
            routesRequiringAuthorization.contains(request.url.path);

        if (isAuthorizationRequired) {
          final authorizationHeader = request.headers['Authorization'] ??
              request.headers['authorization'];

          if (authorizationHeader == null) {
            return Response(401);
          }

          if (!authorizationHeader.startsWith('Token ')) {
            return Response(401);
          }

          final token = authorizationHeader.replaceFirst('Token', '').trim();

          if (token.isEmpty) {
            return Response(401);
          }

          final userTokenClaim = jwtService.getUserTokenClaim(token);

          if (userTokenClaim == null) {
            return Response(401);
          }

          final user = await usersService.getUserByEmail(userTokenClaim.email);

          if (user == null) {
            return Response(401);
          }

          request = request.change(context: {'user': user});
        }

        return Future.sync(() => innerHandler(request)).then((response) {
          return response;
        });
      };
    };
