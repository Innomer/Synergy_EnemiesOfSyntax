import 'package:dio/dio.dart';

class ProfileRepo {
  static ProfileRepo? _instance;

  ProfileRepo._();

  static ProfileRepo get instance {
    _instance ??= ProfileRepo._();
    return _instance!;
  }

  final Dio client = Dio();
}
