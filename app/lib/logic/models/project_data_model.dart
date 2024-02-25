class FileModel {
  final String filename;
  final String version;
  final String commitMessage;
  final String commitId;
  final String timestamp;
  final String tag;
  final String filepath;

  FileModel({
    required this.filename,
    required this.version,
    required this.commitMessage,
    required this.commitId,
    required this.timestamp,
    required this.tag,
    required this.filepath,
  });

  factory FileModel.fromJson(Map<String, dynamic> json) {
    return FileModel(
      filename: json['filename'],
      version: json['version'],
      commitMessage: json['commitMessage'],
      commitId: json['commitId'],
      timestamp: json['timestamp'],
      tag: json['tag'],
      filepath: json['filepath'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'filename': filename,
      'version': version,
      'commitMessage': commitMessage,
      'commitId': commitId,
      'timestamp': timestamp,
      'tag': tag,
      'filepath': filepath,
    };
  }
}

class ProjectDataModel {
  final Map<String, FileModel>? documents;
  final Map<String, FileModel>? images;
  final Map<String, FileModel>? word;
  final Map<String, FileModel>? excel;
  final Map<String, FileModel>? cad;
  final Map<String, FileModel>? misc;

  ProjectDataModel({
    this.documents,
    this.images,
    this.word,
    this.excel,
    this.cad,
    this.misc,
  });

  factory ProjectDataModel.fromJson(Map<String, dynamic> json) {
    return ProjectDataModel(
      documents: (json['documents'] as Map<String, dynamic>?)?.map((key, value) => MapEntry(key, FileModel.fromJson(value))),
      images: (json['images'] as Map<String, dynamic>?)?.map((key, value) => MapEntry(key, FileModel.fromJson(value))),
      word: (json['word'] as Map<String, dynamic>?)?.map((key, value) => MapEntry(key, FileModel.fromJson(value))),
      excel: (json['excel'] as Map<String, dynamic>?)?.map((key, value) => MapEntry(key, FileModel.fromJson(value))),
      cad: (json['cad'] as Map<String, dynamic>?)?.map((key, value) => MapEntry(key, FileModel.fromJson(value))),
      misc: (json['misc'] as Map<String, dynamic>?)?.map((key, value) => MapEntry(key, FileModel.fromJson(value))),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'documents': documents?.map((key, value) => MapEntry(key, value.toJson())),
      'images': images?.map((key, value) => MapEntry(key, value.toJson())),
      'word': word?.map((key, value) => MapEntry(key, value.toJson())),
      'excel': excel?.map((key, value) => MapEntry(key, value.toJson())),
      'cad': cad?.map((key, value) => MapEntry(key, value.toJson())),
      'misc': misc?.map((key, value) => MapEntry(key, value.toJson())),
    };
  }
}
