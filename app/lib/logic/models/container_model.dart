class ContainerModel {
  final String id;
  final String serverId;
  final String containerId;
  final String name;
  final List<String> image;
  final String status;
  final bool isDeleted;

  ContainerModel({
    required this.id,
    required this.serverId,
    required this.containerId,
    required this.name,
    required this.image,
    required this.status,
    required this.isDeleted,
  });

  factory ContainerModel.fromJson(Map<String, dynamic> json) {
    return ContainerModel(
      id: json['_id'],
      serverId: json['serverId'],
      containerId: json['containerId'],
      name: json['name'],
      image: List<String>.from(json['image']),
      status: json['status'],
      isDeleted: json['isDeleted'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'serverId': serverId,
      'containerId': containerId,
      'name': name,
      'image': image,
      'status': status,
      'isDeleted': isDeleted,
    };
  }

  ContainerModel copyWith({
    String? id,
    String? serverId,
    String? containerId,
    String? name,
    List<String>? image,
    String? status,
    bool? isDeleted,
  }) {
    return ContainerModel(
      id: id ?? this.id,
      serverId: serverId ?? this.serverId,
      containerId: containerId ?? this.containerId,
      name: name ?? this.name,
      image: image ?? this.image,
      status: status ?? this.status,
      isDeleted: isDeleted ?? this.isDeleted,
    );
  }

  @override
  String toString() {
    return 'ContainerModel(id: $id, serverId: $serverId, containerId: $containerId, name: $name, image: $image, status: $status, isDeleted: $isDeleted)';
  }
}
