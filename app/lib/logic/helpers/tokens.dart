import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../../utils/const.dart';

class Tokens {
  // Singleton pattern to ensure only one instance of the class is created in the entire app
  Tokens._();
  static final Tokens _instance = Tokens._();
  factory Tokens() => _instance;

  /// Method to save the tokens
  Future<void> saveTokens({List<String>? tokens, bool saveRefreshToken = true}) async {
    if (tokens == null) return;

    // Print the cookie sent by the server
    // logger.d(response.headers['set-cookie']);

    final String? accessToken = splitToken(tokens[0]);
    final String? refreshToken = saveRefreshToken ? splitToken(tokens[1]) : null;

    // logger.d('accessToken: $accessToken');
    // logger.d('refreshToken: $refreshToken');

    const storage = FlutterSecureStorage();

    await storage.write(key: "accessToken", value: accessToken!);
    if (saveRefreshToken) await storage.write(key: "refreshToken", value: refreshToken!);
  }

  /// Get the tokens from the secure storage
  Future<List<String?>> getTokens() async {
    const storage = FlutterSecureStorage();

    final accessToken = await storage.read(key: "accessToken");
    final refreshToken = await storage.read(key: "refreshToken");

    return [accessToken, refreshToken];
  }

  /// Split the token from the cookie
  String? splitToken(String data) {
    final tokenStart = data.indexOf('Token=');
    final tokenEnd = data.indexOf(';');

    if (tokenStart != -1 && tokenEnd != -1) {
      final token = data.substring(tokenStart + 'Token='.length, tokenEnd);

      // logger.d('Token: $token');
      return token;
    } else {
      logger.d('Invalid data');
      return null;
    }
  }

  /// Clear the tokens from the secure storage
  Future<void> deleteTokens() async {
    const storage = FlutterSecureStorage();

    await storage.delete(key: "accessToken");
    await storage.delete(key: "refreshToken");
  }
}
