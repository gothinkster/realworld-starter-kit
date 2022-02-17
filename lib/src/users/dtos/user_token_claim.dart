class UserTokenClaim {
  final String email;

  UserTokenClaim({required this.email});

  UserTokenClaim.fromJson(Map<String, dynamic> json) : email = json['email'];

  Map<String, dynamic> toJson() => {
        'email': email,
      };
}
