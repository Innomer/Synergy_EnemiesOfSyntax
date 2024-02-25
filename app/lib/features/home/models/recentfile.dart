class RecentFile {
  String? fileName;
  String? imageUrl;

  RecentFile({this.fileName, this.imageUrl});

  RecentFile.fromJson(Map<String, dynamic> json) {
    fileName = json['fileName'];
    imageUrl = json['imageUrl'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['fileName'] = this.fileName;
    data['imageUrl'] = this.imageUrl;
    return data;
  }
}
