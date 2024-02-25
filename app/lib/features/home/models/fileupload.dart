class FileUpload {
  String? fileName;
  String? url;
  double? progress;
  String? progressSize;
  String? progressMax;

  FileUpload(
      {this.fileName,
      this.url,
      this.progress,
      this.progressSize,
      this.progressMax});

  FileUpload.fromJson(Map<String, dynamic> json) {
    fileName = json['fileName'];
    url = json['url'];
    progress = json['progress'];
    progressSize = json['progressSize'];
    progressMax = json['progressMax'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['fileName'] = this.fileName;
    data['url'] = this.url;
    data['progress'] = this.progress;
    data['progressSize'] = this.progressSize;
    data['progressMax'] = this.progressMax;
    return data;
  }
}
