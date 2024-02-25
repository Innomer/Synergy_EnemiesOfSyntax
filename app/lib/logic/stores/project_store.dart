// Create a class AuthStore that extends ChangeNotifier and uses singleton pattern.
//
// Path: lib/logic/stores/auth_store.dart
import 'package:flutter/material.dart';

import '../models/project_data_model.dart';
import '../repos/project_repo.dart';

class ProjectStore extends ChangeNotifier {
  ProjectStore._();

  static final ProjectStore _instance = ProjectStore._();

  factory ProjectStore() {
    return _instance;
  }

  var projects = [];

  List<Map<String, ProjectDataModel>>? projectDatas = [];

  // Get all projects
  Future<void> getProjects() async {
    projects = await ProjectRepo.instance.getProjects();
  }

  // Upload a file
  Future<void> uploadFile(String filePath) async {
    await ProjectRepo.instance.uploadFile(filePath);
  }

  // Get all project data
  Future<void> getAllProjectData() async {
    projectDatas = await ProjectRepo.instance.getAllProjectData();
  }
  
}
