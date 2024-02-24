class ServerModel {
  String id;
  String profileId;
  String name;
  String description;
  bool isActive;
  String accessKey;
  String accessSecret;
  List<String> containerIds;

  ServerModel({
    required this.id,
    required this.profileId,
    required this.name,
    required this.description,
    required this.isActive,
    required this.accessKey,
    required this.accessSecret,
    required this.containerIds,
  });

  factory ServerModel.fromJson(Map<String, dynamic> json) {
    return ServerModel(
      id: json['_id'],
      profileId: json['profileId'],
      name: json['name'],
      description: json['description'],
      isActive: json['isActive'],
      accessKey: json['accessKey'],
      accessSecret: json['accessSecret'],
      containerIds: List<String>.from(json['containerIds']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'profileId': profileId,
      'name': name,
      'description': description,
      'isActive': isActive,
      'accessKey': accessKey,
      'accessSecret': accessSecret,
      'containerIds': containerIds,
    };
  }

  @override
  String toString() {
    return 'ServerModel{id: $id, profileId: $profileId, name: $name, description: $description, isActive: $isActive, accessKey: $accessKey, accessSecret: $accessSecret, containerIds: $containerIds}';
  }
}
