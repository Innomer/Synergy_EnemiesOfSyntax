import 'package:dio/dio.dart';
import 'package:synergy/logic/models/project_data_model.dart';
import 'package:synergy/utils/utils.dart';

class ProjectRepo {
  static ProjectRepo? _instance;

  ProjectRepo._();

  static ProjectRepo get instance {
    _instance ??= ProjectRepo._();
    return _instance!;
  }

  final Dio client = Dio();

  Future<dynamic> getProjects() async {
    try {
      final response = await client.get('$apiUrl/file/projects');
      logger.d(response.data);
      return response.data;
    } catch (e) {
      throw Exception(e);
    }
  }

  // Upload a file using multipart request
  Future<dynamic> uploadFile(String filePath) async {
    try {
      final formData = FormData.fromMap({
        'project': 'project_id',
        'commitMessage': 'commit message',
        'file': await MultipartFile.fromFile(filePath),
      });
      final response = await client.post(
        '$apiUrl/file/uploadSingle',
        data: formData,
        options: Options(
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        ),
      );
      logger.d(response.data);
      return response.data;
    } catch (e) {
      throw Exception(e);
    }
  }

  /// Get All Projects File Structre
  Future<List<Map<String, ProjectDataModel>>?> getAllProjectData() async {
    try {
      final response = await client.get('$apiUrl/file/fs');
      logger.d(response.data);
      if (response.statusCode == 200) {
        List<Map<String, ProjectDataModel>> data = [];

        for (Map<String, ProjectDataModel> item in response.data) {
          // data.add({'projectData': ProjectDataModel.fromJson(item)});
          item.forEach((key, value) {
            // data.add({key: ProjectDataModel.fromJson(value)});
          });
        }

        return data;
      }
    } catch (e) {
      throw Exception(e);
    }
    return null;
  }
}
