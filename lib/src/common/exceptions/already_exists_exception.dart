class AlreadyExistsException implements Exception {
  final String message;
  final String? parameterName;

  AlreadyExistsException({required this.message, this.parameterName});
}
