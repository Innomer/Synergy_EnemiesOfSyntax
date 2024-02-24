// Create a class AuthRepo that uses singleton pattern.

import 'dart:developer';

import 'package:dio/dio.dart';

import '../../utils/utils.dart';
import '../helpers/tokens.dart';
import '../models/user_auth_model.dart';

class AuthRepo {
  static AuthRepo? _instance;

  AuthRepo._();

  static AuthRepo get instance {
    _instance ??= AuthRepo._();
    return _instance!;
  }

  final Dio client = Dio();

  Future<bool> testToken() async {
    log("AuthRepo | testToken");
    try {
      final tokens = await Tokens().getTokens();
      final response = await client.get(
        '$apiUrl/auth/heart-beat',

        // Send the access and refresh token in the cookies header
        options: Options(headers: {'Cookie': 'accessToken=${tokens[0]}; refreshToken=${tokens[1]}'}),
      );
      // logger.d(response.data);

      // logger.d("Cookie: ${response.headers['set-cookie']}");

      Tokens().saveTokens(
        tokens: response.headers['set-cookie'],
        saveRefreshToken: false,
      );

      logger.d("Authenticated");

      return true; // Authenticated
    } catch (e, st) {
      logger.d("!! Not Authenticated");
      logger.d("Error: $e");
      logger.d("Stacktrace: $st");
      return false; // Error
    }
  }

  Future<AuthModel?> fetchUserAuth() async {
    log("AuthRepo | fetchUserAuth");
    try {
      final tokens = await Tokens().getTokens();
      final response = await client.get(
        '$apiUrl/auth/me',

        // Send the access and refresh token in the cookies header
        options: Options(headers: {
          'Cookie': 'accessToken=${tokens[0]}; refreshToken=${tokens[1]}',
        }),
      );

      // logger.d("Cookie: ${response.headers['set-cookie']}");

      Tokens().saveTokens(
        tokens: response.headers['set-cookie'],
        saveRefreshToken: false,
      );

      // logger.d(response.data);

      return AuthModel.fromJSON(response.data['data']);
    } catch (e, st) {
      logger.d("!! Not Authenticated");
      logger.d("Error: $e");
      logger.d("Stacktrace: $st");
      return null; // Error
    }
  }

  Future<bool> loginWithUsernameAndPassword({
    required String username,
    required String password,
  }) async {
    log("AuthRepo | loginWithUsernameAndPassword");
    try {
      final response = await client.post(
        '$apiUrl/auth/login/',
        data: {
          'username': username,
          'password': password,
        },
      );
      logger.d(response.data);

      Tokens().saveTokens(tokens: response.headers['set-cookie']);

      return true; // Login successful
    } catch (e, st) {
      logger.d("Error: $e");
      logger.d("Stacktrace: $st");
      return false; // Login failed
    }
  }

  // Login with email and password
  Future<bool> loginWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    log("AuthRepo | loginWithEmailAndPassword");
    try {
      final response = await client.post(
        '$apiUrl/auth/login/',
        data: {
          'email': email,
          'password': password,
        },
      );
      logger.d(response.data);

      Tokens().saveTokens(tokens: response.headers['set-cookie']);

      return true; // Login successful
    } catch (e) {
      logger.d(e);
      return false; // Login failed
    }
  }

  Future<bool> register({
    required String username,
    required String email,
    required String password,
    required String fcmToken,
  }) async {
    log("AuthRepo | register");
    try {
      final response = await client.post(
        '$apiUrl/auth/register',
        data: {
          'username': username,
          'email': email,
          'password': password,
          'fcmToken': fcmToken,
        },
      );
      logger.d(response.data);

      Tokens().saveTokens(tokens: response.headers['set-cookie']);

      return true; // Registration successful
    } catch (e) {
      logger.d(e);
      return false; // Registration failed
    }
  }

  Future<void> verifyEmail(String email, String verificationToken) async {
    log("AuthRepo | verifyEmail");
    try {
      final response = await client.post(
        '$apiUrl/auth/verify-email',
        data: {
          'email': email,
          'verificationToken': verificationToken,
        },
      );
      logger.d(response.data);
    } catch (e) {
      logger.d(e);
    }
  }

  Future<bool> logout() async {
    log("AuthRepo | logout");
    try {
      final tokens = await Tokens().getTokens();
      final response = await client.patch(
        '$apiUrl/auth/logout',
        // Include headers or other necessary data if required
        options: Options(headers: {'Cookie': 'accessToken=${tokens[0]}; refreshToken=${tokens[1]}'}),
      );
      logger.d(response.data);

      if (response.statusCode == 200) {
        Tokens().deleteTokens();
        return true;
      }
    } catch (e, st) {
      logger.d(e);
      logger.d(st);
    }
    return false;
  }

  /// Delete account
  Future<bool> deleteAccount() async {
    log("AuthRepo | deleteAccount");
    try {
      final tokens = await Tokens().getTokens();
      final response = await client.delete(
        '$apiUrl/auth/me',
        // Include headers or other necessary data if required
        options: Options(headers: {'Cookie': 'accessToken=${tokens[0]}; refreshToken=${tokens[1]}'}),
      );
      logger.d(response.data);

      if (response.statusCode == 200) {
        Tokens().deleteTokens();
        return true;
      }
    } catch (e, st) {
      logger.d(e);
      logger.d(st);
    }
    return false;
  }

  // Get request to /google for Googel Authentication
  Future<String?> googleAuth() async {
    log("AuthRepo | googleAuth");
    logger.d("Google Auth");
    try {
      final response = await client.get(
        '$apiUrl/auth/linkedin',
        // Include headers or other necessary data if required
      );
      logger.d(response.data);

      return response.data;

      // Handle Google Authentication recieved from the server
    } catch (e) {
      logger.d(e);
      return null;
    }
  }
}
