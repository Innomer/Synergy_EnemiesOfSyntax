// Create a class AuthStore that extends ChangeNotifier and uses singleton pattern.
//
// Path: lib/logic/stores/auth_store.dart
import 'package:flutter/material.dart';

import '../../utils/utils.dart';
import '../helpers/tokens.dart';
import '../models/user_auth_model.dart';
import '../repos/auth_repo.dart';

class AuthStore extends ChangeNotifier {
  AuthStore._();

  static final AuthStore _instance = AuthStore._();

  factory AuthStore() {
    return _instance;
  }

  bool isAuthenticated = false;

  AuthModel? userAuth;

  Future<bool> testToken() async {
    final List<String?> tokens = await Tokens().getTokens();
    // logger.d("tokens: ${tokens[0]} \n${tokens[1]}");
    if (tokens[0] != null && tokens[1] != null) {
      isAuthenticated = await AuthRepo.instance.testToken();
    } else {
      isAuthenticated = false;
    }
    if (isAuthenticated && userAuth == null) {
      userAuth = await AuthRepo.instance.fetchUserAuth();
    }
    notifyListeners();
    return isAuthenticated;
  }

  /// Fetch user auth details
  Future<bool> fetchUserAuth() async {
    userAuth = await AuthRepo.instance.fetchUserAuth();
    notifyListeners();
    return userAuth != null;
  }

  // LOgin with email and password
  Future<bool> login({required String loginString, required String password}) async {
    // Check whether loginString is email or username

    logger.d("loginString: $loginString");
    logger.d("password: $password");

    final bool isEmail = loginString.contains('@');
    if (isEmail) {
      if (await AuthRepo.instance.loginWithEmailAndPassword(email: loginString, password: password)) {
        isAuthenticated = true;
        
      }
    } else {
      if (await AuthRepo.instance.loginWithUsernameAndPassword(username: loginString, password: password)) {
        isAuthenticated = true;
      }
    }

    notifyListeners();
    return isAuthenticated;
  }

  Future<bool> register({
    required String username,
    required String email,
    required String password,
    required String fcmToken,
  }) async {
    isAuthenticated = await AuthRepo.instance.register(
      username: username,
      email: email,
      password: password,
      fcmToken: fcmToken,
    );

    notifyListeners();
    return isAuthenticated;
  }

  // Logout
  Future<bool> logout() async {
    isAuthenticated = !await AuthRepo.instance.logout();
    notifyListeners();
    return !isAuthenticated;
  }

  // Delete account
  Future<bool> deleteAccount() async {
    isAuthenticated = !await AuthRepo.instance.deleteAccount();
    notifyListeners();
    return !isAuthenticated;
  }
}
