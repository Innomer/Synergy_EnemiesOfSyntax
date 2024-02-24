class AuthModel {
  String id;
  String username;
  String email;
  String? profileId;
  String? creatorId;
  String accessLevel;
  bool isEmailVerified;
  bool isOAuthUser;

  AuthModel({
    required this.id,
    required this.username,
    required this.email,
    this.profileId,
    this.creatorId,
    required this.accessLevel,
    required this.isEmailVerified,
    required this.isOAuthUser,
  });

  factory AuthModel.fromJSON(Map<String, dynamic> json) {
    return AuthModel(
      id: json['_id'],
      username: json['username'],
      email: json['email'],
      profileId: json['profileId'],
      creatorId: json['creatorId'],
      accessLevel: json['accessLevel'],
      isEmailVerified: json['isEmailVerified'],
      isOAuthUser: json['isOAuthUser'],
    );
  }

  Map<String, dynamic> toJSON() {
    return {
      '_id': id,
      'username': username,
      'email': email,
      'profileId': profileId,
      'creatorId': creatorId,
      'accessLevel': accessLevel,
      'isEmailVerified': isEmailVerified,
      'isOAuthUser': isOAuthUser,
    };
  }

  AuthModel copyWith({
    String? username,
    String? email,
    String? profileId,
    String? creatorId,
    String? accessLevel,
    bool? isEmailVerified,
    bool? isOAuthUser,
  }) {
    return AuthModel(
      id: id,
      username: username ?? this.username,
      email: email ?? this.email,
      profileId: profileId ?? this.profileId,
      creatorId: creatorId ?? this.creatorId,
      accessLevel: accessLevel ?? this.accessLevel,
      isEmailVerified: isEmailVerified ?? this.isEmailVerified,
      isOAuthUser: isOAuthUser ?? this.isOAuthUser,
    );
  }

  @override
  String toString() {
    return 'AuthModel{_id: $id, username: $username, email: $email, profileId: $profileId, creatorId: $creatorId, accessLevel: $accessLevel, isEmailVerified: $isEmailVerified, isOAuthUser: $isOAuthUser}';
  }
}
