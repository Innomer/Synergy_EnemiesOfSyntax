import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../logic/stores/auth_store.dart';
import '../../utils/palette.dart';
import '../../utils/typography.dart';
import '../../widgets/primary_textfield.dart';
import '../main/main_screen.dart';
import 'register_screen.dart';

class LoginScreen extends StatelessWidget {
  LoginScreen({super.key});

  final TextEditingController emailUsernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("LOGIN", style: Typo.titleLarge),
        centerTitle: false,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            mainAxisSize: MainAxisSize.max,
            children: [
              const SizedBox(height: 8),
              PrimaryTextField(
                controller: emailUsernameController,
                hintText: 'Enter your email or username',
                labelText: 'Email or Username',
              ),
              const SizedBox(height: 16),
              PrimaryTextField(
                controller: passwordController,
                hintText: 'Enter your password',
                labelText: 'Password',
              ),
              const SizedBox(height: 20),
              GestureDetector(
                onTap: () async {
                  if (emailUsernameController.text.isEmpty || passwordController.text.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Please enter email and password'),
                      ),
                    );
                    return;
                  }

                  if (await context.read<AuthStore>().login(loginString: emailUsernameController.text, password: passwordController.text)) {
                    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const MainScreen()));
                  } else {
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Invalid credentials'),
                        ),
                      );
                    }
                  }
                },
                child: Container(
                  height: 48,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8.0),
                    gradient: Palette.primaryGradient,
                  ),
                  child: Center(
                    child: Text('Login',
                        style: Typo.titleLarge.copyWith(
                          color: Theme.of(context).brightness == Brightness.light ? Palette.white : Palette.black,
                        )),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              // const Text("OR", style: Typo.titleMedium),
              // const SizedBox(height: 24),
              // SizedBox(
              //   width: double.infinity,
              //   child: GestureDetector(
              //     onTap: () async {
              //       // Handle login logic
              //       // if (await context.read<AuthStore>().signInWithApple()) {
              //       if (context.mounted) context.router.replace(const MainScaffoldRoute());
              //       // } else {
              //       //   if (context.mounted) {
              //       //     ScaffoldMessenger.of(context).showSnackBar(
              //       //       const SnackBar(
              //       //         content: Text('Invalid credentials'),
              //       //       ),
              //       //     );
              //       //   }
              //       // }
              //     },
              //     child: Container(
              //       height: 48,
              //       width: double.infinity,
              //       decoration: BoxDecoration(
              //         borderRadius: BorderRadius.circular(8),
              //         border: Border.all(color: Palette().textColor(context)), // Set the border color to white
              //         color: Colors.transparent, // Set the background color to transparent
              //       ),
              //       child: Row(
              //         mainAxisAlignment: MainAxisAlignment.center,
              //         children: [
              //           SvgPicture.asset(
              //             'assets/svgs/google.svg',
              //             width: 20,
              //             height: 20,
              //           ),
              //           const SizedBox(width: 8),
              //           const Text(
              //             'Continue with Google',
              //             style: Typo.bodyMedium,
              //           ),
              //         ],
              //       ),
              //     ),
              //   ),
              // ),
              // const SizedBox(height: 8),
              // SizedBox(
              //   width: double.infinity,
              //   child: GestureDetector(
              //     onTap: () async {
              //       // Handle login logic
              //       // if (await context.read<AuthStore>().signInWithApple()) {
              //       if (context.mounted) context.router.replace(const MainScaffoldRoute());
              //       // } else {
              //       //   if (context.mounted) {
              //       //     ScaffoldMessenger.of(context).showSnackBar(
              //       //       const SnackBar(
              //       //         content: Text('Invalid credentials'),
              //       //       ),
              //       //     );
              //       //   }
              //       // }
              //     },
              //     child: Container(
              //       height: 48.0,
              //       width: double.infinity,
              //       decoration: BoxDecoration(
              //         borderRadius: BorderRadius.circular(8.0),
              //         border: Border.all(color: Palette().textColor(context)), // Set the border color to white
              //         color: Colors.transparent, // Set the background color to transparent
              //       ),
              //       child: Row(
              //         mainAxisAlignment: MainAxisAlignment.center,
              //         children: [
              //           SvgPicture.asset(
              //             'assets/svgs/apple.svg',
              //             width: 20,
              //             height: 20,
              //           ),
              //           const SizedBox(width: 8),
              //           const Text(
              //             'Continue with Apple',
              //             style: Typo.bodyMedium,
              //           ),
              //         ],
              //       ),
              //     ),
              //   ),
              // ),
              // const SizedBox(height: 8),
              // SizedBox(
              //   width: double.infinity,
              //   child: GestureDetector(
              //     onTap: () async {
              //       // Handle login logic
              //       // if (await context.read<AuthStore>().signInWithApple()) {
              //       if (context.mounted) context.router.replace(const MainScaffoldRoute());
              //       // } else {
              //       //   if (context.mounted) {
              //       //     ScaffoldMessenger.of(context).showSnackBar(
              //       //       const SnackBar(
              //       //         content: Text('Invalid credentials'),
              //       //       ),
              //       //     );
              //       //   }
              //       // }
              //     },
              //     child: Container(
              //       height: 48.0,
              //       width: double.infinity,
              //       decoration: BoxDecoration(
              //         borderRadius: BorderRadius.circular(8.0),
              //         border: Border.all(color: Palette().textColor(context)), // Set the border color to white
              //         color: Colors.transparent, // Set the background color to transparent
              //       ),
              //       child: Row(
              //         mainAxisAlignment: MainAxisAlignment.center,
              //         children: [
              //           SvgPicture.asset(
              //             'assets/svgs/apple.svg',
              //             width: 20,
              //             height: 20,
              //           ),
              //           const SizedBox(width: 8),
              //           const Text(
              //             'Continue with Linkedin',
              //             style: Typo.bodyMedium,
              //           ),
              //         ],
              //       ),
              //     ),
              //   ),
              // ),
              // const SizedBox(height: 8),
              // SizedBox(
              //   width: double.infinity,
              //   child: GestureDetector(
              //     onTap: () async {
              //       // Handle login logic
              //       // if (await context.read<AuthStore>().signInWithApple()) {
              //       if (context.mounted) context.router.replace(const MainScaffoldRoute());
              //       // } else {
              //       //   if (context.mounted) {
              //       //     ScaffoldMessenger.of(context).showSnackBar(
              //       //       const SnackBar(
              //       //         content: Text('Invalid credentials'),
              //       //       ),
              //       //     );
              //       //   }
              //       // }
              //     },
              //     child: Container(
              //       height: 48.0,
              //       width: double.infinity,
              //       decoration: BoxDecoration(
              //         borderRadius: BorderRadius.circular(8.0),
              //         border: Border.all(color: Palette().textColor(context)), // Set the border color to white
              //         color: Colors.transparent, // Set the background color to transparent
              //       ),
              //       child: Row(
              //         mainAxisAlignment: MainAxisAlignment.center,
              //         children: [
              //           SvgPicture.asset(
              //             'assets/svgs/apple.svg',
              //             width: 20,
              //             height: 20,
              //           ),
              //           const SizedBox(width: 8),
              //           const Text(
              //             'Continue with Linkedin',
              //             style: Typo.bodyMedium,
              //           ),
              //         ],
              //       ),
              //     ),
              //   ),
              // ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('New here?'),
                  TextButton(
                    child: Text('Register', style: Typo.labelLarge.copyWith(color: Palette().textColor(context))),
                    onPressed: () {
                      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => RegisterScreen()));
                    },
                  ),
                ],
              ),
              const SizedBox(height: 45),
            ],
          ),
        ),
      ),
    );
  }
}
