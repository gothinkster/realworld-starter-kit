import 'package:shelf/shelf.dart';

import '../../users/jwt_service.dart';
import '../../users/model/user.dart';
import '../../users/users_service.dart';

class AuthProvider {
  final UsersService usersService;
  final JwtService jwtService;

  AuthProvider({required this.usersService, required this.jwtService});

  Middleware requireAuth() => (innerHandler) {
        return (request) async {
          final authorizationHeader = request.headers['Authorization'] ??
              request.headers['authorization'];

          if (authorizationHeader == null) {
            return Response(401);
          }

          final user =
              await _getUserFromAuthorizationHeader(authorizationHeader);

          if (user == null) {
            return Response(401);
          }

          request = request.change(context: {'user': user});

          return Future.sync(() => innerHandler(request)).then((response) {
            return response;
          });
        };
      };

  Middleware optionalAuth() => (innerHandler) {
        return (request) async {
          final authorizationHeader = request.headers['Authorization'] ??
              request.headers['authorization'];

          if (authorizationHeader != null) {
            final user =
                await _getUserFromAuthorizationHeader(authorizationHeader);

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

  Future<User?> _getUserFromAuthorizationHeader(
      String authorizationHeader) async {
    if (!authorizationHeader.startsWith('Token ')) {
      return null;
    }

    final token = authorizationHeader.replaceFirst('Token', '').trim();

    if (token.isEmpty) {
      return null;
    }

    final userTokenClaim = jwtService.getUserTokenClaim(token);

    if (userTokenClaim == null) {
      return null;
    }

    return await usersService.getUserByEmail(userTokenClaim.email);
  }
}
