import 'dart:io';

import 'package:dart_shelf_realworld_example_app/src/api_router.dart';
import 'package:dart_shelf_realworld_example_app/src/users/jwt_service.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_service.dart';
import 'package:dart_shelf_realworld_example_app/src/users/users_router.dart';
import 'package:postgres/postgres.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';

Future<HttpServer> createServer() async {
  final authSecretKey = Platform.environment['AUTH_SECRET_KEY'];
  final authIssuer = Platform.environment['AUTH_ISSUER'];
  final dbHost = Platform.environment['DB_HOST'];
  final envDbPort = Platform.environment['DB_PORT'];
  final dbName = Platform.environment['DB_NAME'];
  final dbUser = Platform.environment['DB_USER'];
  final dbPassword = Platform.environment['DB_PASSWORD'];

  if (authSecretKey == null) {
    throw StateError('Environment variable AUTH_SECRET_KEY is required');
  }

  if (authIssuer == null) {
    throw StateError('Environment variable AUTH_ISSUER is required');
  }

  if (dbHost == null) {
    throw ArgumentError('Environment variable DB_HOST must be an integer');
  }

  if (envDbPort == null) {
    throw StateError('Environment variable DB_PORT is required');
  }

  if (dbName == null) {
    throw StateError('Environment variable DB_NAME is required');
  }

  final dbPort = int.tryParse(envDbPort);

  if (dbPort == null) {
    throw ArgumentError('Environment variable DB_PORT must be an integer');
  }

  final connection = PostgreSQLConnection(dbHost, dbPort, dbName,
      username: dbUser, password: dbPassword);

  await connection.open();

  final usersService = UsersService(connection: connection);
  final jwtService = JwtService(issuer: authIssuer, secretKey: authSecretKey);
  final usersRouter =
      UsersRouter(usersService: usersService, jwtService: jwtService);

  final apiRouter = ApiRouter(usersRouter: usersRouter).router;

  // Use any available host or container IP (usually `0.0.0.0`).
  final ip = InternetAddress.anyIPv4;

  // Configure a pipeline that logs requests.
  final handler = Pipeline().addMiddleware(logRequests()).addHandler(apiRouter);

  final port = int.parse(Platform.environment['PORT'] ?? '8080');

  // For running in containers, we respect the PORT environment variable.
  final server = await serve(handler, ip, port);
  print('Server listening on port ${server.port}');
  return server;
}
