import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:pdftron_flutter/pdftron_flutter.dart';
import 'package:provider/provider.dart';
import 'package:synergy/features/onboarding/splash_screen.dart';
import 'package:synergy/features/projects/view_project/features/dashboard/views/screens/onboarding_example.dart';
import 'package:synergy/utils/utils.dart';

import 'firebase_options.dart';
import 'logic/stores/auth_store.dart';
import 'logic/stores/project_store.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  initPlatformState();

  runApp(const MainApp());
}

// Platform messages are asynchronous, so we initialize in an async method.
Future<void> initPlatformState() async {
  try {
    PdftronFlutter.initialize("demo:1708770002935:7f56906f030000000080a44f7237599240a4e00235f3c0f3230bcd66f4");
    logger.d('initialize success');
  } on PlatformException {
    logger.d('Failed to get platform version.');
  }
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
        ChangeNotifierProvider(create: (_) => ProjectStore()),
      ],
      child: GetMaterialApp(
        debugShowCheckedModeBanner: false,
        theme: lightTheme(),
        darkTheme: darkTheme(),
        themeMode: ThemeMode.system,
        home: const SplashScreen(),
      ),
    );
  }
}
