import 'dart:io';

import 'package:dart_shelf_realworld_example_app/app_router.dart';
import 'package:dotenv/dotenv.dart';
import 'package:postgres/postgres.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';

void main(List<String> args) async {
  load();

  final authSecretKey = env["AUTH_SECRET_KEY"];
  final authIssuer = env["AUTH_ISSUER"];
  final dbHost = env["DB_HOST"];
  final envDbPort = env["DB_PORT"];
  final dbName = env["DB_NAME"];
  final dbUser = env["DB_USER"];
  final dbPassword = env["DB_PASSWORD"];

  if (authSecretKey == null) {
    throw StateError("Environment variable AUTH_SECRET_KEY is required");
  }

  if (authIssuer == null) {
    throw StateError("Environment variable AUTH_ISSUER is required");
  }

  if (dbHost == null) {
    throw StateError("Environment variable DB_HOST is required");
  }

  if (envDbPort == null) {
    throw StateError("Environment variable DB_PORT is required");
  }

  if (dbName == null) {
    throw StateError("Environment variable DB_NAME is required");
  }

  final dbPort = int.tryParse(envDbPort);

  if (dbPort == null) {
    throw ArgumentError("Environment variable DB_PORT must be an integer");
  }

  final connection = PostgreSQLConnection(dbHost, dbPort, dbName,
      username: dbUser, password: dbPassword);

  await connection.open();

  final router = AppRouter(
          secretKey: authSecretKey, issuer: authIssuer, connection: connection)
      .router;

  // Use any available host or container IP (usually `0.0.0.0`).
  final ip = InternetAddress.anyIPv4;

  // Configure a pipeline that logs requests.
  final _handler = Pipeline().addMiddleware(logRequests()).addHandler(router);

  // For running in containers, we respect the PORT environment variable.
  final port = int.parse(Platform.environment['PORT'] ?? '8080');
  final server = await serve(_handler, ip, port);
  print('Server listening on port ${server.port}');
}
