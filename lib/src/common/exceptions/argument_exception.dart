class ArgumentException implements Exception {
  final String message;
  final String? parameterName;

  ArgumentException({required this.message, this.parameterName});
}
