class ErrorDto {
  final List<String> errors;

  ErrorDto({required this.errors});

  ErrorDto.fromJson(Map<String, dynamic> json)
      : errors = List<String>.from(json['errors']['body']);

  Map<String, dynamic> toJson() => {
        'errors': {'body': errors}
      };
}
