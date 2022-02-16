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
      : username = json['username'],
        email = json['email'],
        token = json['token'],
        bio = json['bio'],
        image = json['image'];

  Map<String, dynamic> toJson() => {
        'username': username,
        'email': email,
        'token': token,
        'bio': bio,
        'image': image
      };
}
