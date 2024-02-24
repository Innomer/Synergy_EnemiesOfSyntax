// import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

import 'features/main/main_screen.dart';
import 'firebase_options.dart';
import 'logic/stores/auth_store.dart';
import 'logic/stores/profile_store.dart';
import 'utils/dark_theme.dart';
import 'utils/light_theme.dart';
import 'utils/palette.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      systemNavigationBarColor: Theme.of(context).brightness == Brightness.light ? Palette.white : null, // Set the navigation bar color
      systemNavigationBarIconBrightness: Brightness.light, // Set the navigation bar icon brightness
    ));
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthStore()),
        ChangeNotifierProvider(create: (_) => ProfileStore()),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: lightTheme(),
        darkTheme: darkTheme(),
        themeMode: ThemeMode.system,
        home: const MainScreen(),
      ),
    );
  }
}
