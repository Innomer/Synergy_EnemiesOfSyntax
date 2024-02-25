class FolderStorage {
  String? folderName;
  String? storage;
  String? colors;

  FolderStorage({this.folderName, this.storage, this.colors});

  FolderStorage.fromJson(Map<String, dynamic> json) {
    folderName = json['folderName'];
    storage = json['storage'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['folderName'] = this.folderName;
    data['storage'] = this.storage;
    return data;
  }
}
