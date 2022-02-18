class ProfileDto {
  final String username;
  final String? bio;
  final String? image;
  final bool following;

  ProfileDto(
      {required this.username, this.bio, this.image, required this.following});

  ProfileDto.fromJson(Map<String, dynamic> json)
      : username = json['profile']['username'],
        bio = json['profile']['bio'],
        image = json['profile']['image'],
        following = json['profile']['following'];

  Map<String, dynamic> toJson() => {
        'profile': {
          'username': username,
          'bio': bio,
          'image': image,
          'following': following
        }
      };
}
