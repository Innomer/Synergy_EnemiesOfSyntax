// ignore_for_file: use_build_context_synchronously

import 'dart:async';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:synergy/features/projects/view_project/features/dashboard/views/screens/onboarding_example.dart';
import 'package:synergy/logic/stores/project_store.dart';

import '../../logic/stores/auth_store.dart';
import '../main/main_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.bounceOut,
      reverseCurve: Curves.bounceIn,
    );
    _animationController.forward();
    super.initState();
    handleNavigation();
  }

  Future<void> initApis() async {
    log("SplashScreen | initApis");
    context.read<ProjectStore>().getProjects();
    context.read<ProjectStore>().getAllProjectData();
    // if (!context.read<AuthStore>().isAuthenticated) {
    //   if (await context.read<AuthStore>().testToken()) {
    //     // await context.read<ServerStore>().fetchMyServers();
    //     // for (final server in context.read<ServerStore>().servers) {
    //     //   await context.read<ContainerStore>().fetchServerContainers(server.id);
    //     // }
    //   }
    // }
  }

  void handleNavigation() async {
    await initApis();

    // wait 1 second
    await Future.delayed(const Duration(milliseconds: 1000));

    if (context.read<AuthStore>().isAuthenticated) {
      if (context.mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const MainScreen()),
        );
      }
    } else {
      if (context.mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => OnboardingExample()),
        );
      }
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: ScaleTransition(
          scale: _animation,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image(
                image: const AssetImage('assets/images/Docstruct.jpg'),
                width: MediaQuery.of(context).size.width * 0.6,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
