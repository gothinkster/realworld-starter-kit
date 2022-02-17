class UserDto {
  final String username;
  final String email;
  final String token;
  final String? bio;
  final String? image;

  UserDto(
      {required this.username,
      required this.email,
      required this.token,
      this.bio,
      this.image});

  UserDto.fromJson(Map<String, dynamic> json)
      : username = json['user']['username'],
        email = json['user']['email'],
        token = json['user']['token'],
        bio = json['user']['bio'],
        image = json['user']['image'];

  Map<String, dynamic> toJson() => {
        'user': {
          'username': username,
          'email': email,
          'token': token,
          'bio': bio,
          'image': image
        }
      };
}
