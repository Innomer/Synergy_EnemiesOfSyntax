// Create a class AuthStore that extends ChangeNotifier and uses singleton pattern.
//
// Path: lib/logic/stores/auth_store.dart
import 'package:flutter/material.dart';

class ProfileStore extends ChangeNotifier {
  ProfileStore._();

  static final ProfileStore _instance = ProfileStore._();

  factory ProfileStore() {
    return _instance;
  }

}
