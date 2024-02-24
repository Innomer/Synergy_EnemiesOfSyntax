import 'package:flutter/material.dart';

import '../../utils/palette.dart';
import '../../utils/typography.dart';
import 'login_screen.dart';

class RegisterScreen extends StatelessWidget {
  RegisterScreen({super.key});

  final TextEditingController usernameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register', style: Typo.titleLarge),
        centerTitle: false,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              const SizedBox(height: 8),
              Column(
                children: <Widget>[
                  Column(
                    children: [
                      SizedBox(
                        height: 52,
                        child: TextFormField(
                          controller: usernameController,
                          decoration: const InputDecoration(
                            hintText: 'Enter your username',
                            labelText: 'Username',
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(Radius.circular(8)),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        height: 52,
                        child: TextFormField(
                          controller: emailController,
                          decoration: const InputDecoration(
                            hintText: 'Enter your email',
                            labelText: 'Email',
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(Radius.circular(8)),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        height: 52,
                        child: TextFormField(
                          controller: passwordController,
                          obscureText: true,
                          decoration: const InputDecoration(
                            hintText: 'Enter your password',
                            labelText: 'Password',
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(Radius.circular(8)),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        height: 52,
                        child: TextFormField(
                          controller: confirmPasswordController,
                          obscureText: true,
                          decoration: const InputDecoration(
                            hintText: 'Enter your password again',
                            labelText: 'Confirm Password',
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(Radius.circular(8)),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: GestureDetector(
                          onTap: () async {
                            if (usernameController.text.isNotEmpty && emailController.text.isNotEmpty && passwordController.text.isNotEmpty && confirmPasswordController.text.isNotEmpty) {
                              if (passwordController.text != confirmPasswordController.text) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text('Passwords do not match'),
                                  ),
                                );
                                return;
                              }
                              //   if (await context.read<AuthStore>().register(
                              //         username: usernameController.text,
                              //         email: emailController.text,
                              //         password: passwordController.text,
                              //         fcmToken: 'fcmToken',
                              //       )) {
                              //     if (context.mounted) context.router.replace(const ResumeRoute());
                              //   } else {
                              //     if (context.mounted) {
                              //       ScaffoldMessenger.of(context).showSnackBar(
                              //         const SnackBar(
                              //           content: Text('Invalid credentials'),
                              //         ),
                              //       );
                              //     }
                              //   }
                              // } else {
                              //   if (context.mounted) {
                              //     ScaffoldMessenger.of(context).showSnackBar(
                              //       const SnackBar(
                              //         content: Text('Please fill all the fields'),
                              //       ),
                              //     );
                              //   }
                            }
                          },
                          child: Container(
                            height: 48,
                            width: double.infinity,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(8),
                              gradient: Palette.primaryGradient,
                            ),
                            child: const Center(
                              child: Text('Register', style: Typo.titleLarge),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      //     const Text("OR", style: Typo.titleLarge),
                      //     const SizedBox(height: 24),
                      //   ],
                      // ),
                      // Column(
                      //   children: [
                      //     SizedBox(
                      //       width: double.infinity,
                      //       child: GestureDetector(
                      //         onTap: () async {
                      //           // Handle login logic
                      //           // if (await context.read<AuthStore>().signInWithApple()) {
                      //           if (context.mounted) context.router.replace(const MainScaffoldRoute());
                      //           // } else {
                      //           //   if (context.mounted) {
                      //           //     ScaffoldMessenger.of(context).showSnackBar(
                      //           //       const SnackBar(
                      //           //         content: Text('Invalid credentials'),
                      //           //       ),
                      //           //     );
                      //           //   }
                      //           // }
                      //         },
                      //         child: Container(
                      //           height: 48,
                      //           width: double.infinity,
                      //           decoration: BoxDecoration(
                      //             borderRadius: BorderRadius.circular(8),
                      //             border: Border.all(color: Palette().textColor(context)), // Set the border color to white
                      //             color: Colors.transparent, // Set the background color to transparent
                      //           ),
                      //           child: Row(
                      //             mainAxisAlignment: MainAxisAlignment.center,
                      //             children: [
                      //               SvgPicture.asset(
                      //                 'assets/svgs/google.svg',
                      //                 width: 20,
                      //                 height: 20,
                      //               ),
                      //               const SizedBox(width: 8),
                      //               const Text(
                      //                 'Continue with Google',
                      //                 style: Typo.bodyMedium,
                      //               ),
                      //             ],
                      //           ),
                      //         ),
                      //       ),
                      //     ),
                      //     const SizedBox(height: 7),
                      //     SizedBox(
                      //       width: double.infinity,
                      //       child: GestureDetector(
                      //         onTap: () async {
                      //           // Handle login logic
                      //           // if (await context.read<AuthStore>().signInWithApple()) {
                      //           if (context.mounted) context.router.replace(const MainScaffoldRoute());
                      //           // } else {
                      //           //   if (context.mounted) {
                      //           //     ScaffoldMessenger.of(context).showSnackBar(
                      //           //       const SnackBar(
                      //           //         content: Text('Invalid credentials'),
                      //           //       ),
                      //           //     );
                      //           //   }
                      //           // }
                      //         },
                      //         child: Container(
                      //           height: 48,
                      //           width: double.infinity,
                      //           decoration: BoxDecoration(
                      //             borderRadius: BorderRadius.circular(8),
                      //             border: Border.all(color: Palette().textColor(context)), // Set the border color to white
                      //             color: Colors.transparent, // Set the background color to transparent
                      //           ),
                      //           child: Row(
                      //             mainAxisAlignment: MainAxisAlignment.center,
                      //             children: [
                      //               SvgPicture.asset(
                      //                 'assets/svgs/apple.svg',
                      //                 width: 20,
                      //                 height: 20,
                      //               ),
                      //               const SizedBox(width: 8),
                      //               const Text(
                      //                 'Continue with Apple',
                      //                 style: Typo.bodyMedium,
                      //               ),
                      //             ],
                      //           ),
                      //         ),
                      //       ),
                      //     ),
                      //     const SizedBox(height: 7),
                      //     SizedBox(
                      //       width: double.infinity,
                      //       child: GestureDetector(
                      //         onTap: () async {
                      //           // Handle login logic
                      //           // if (await context.read<AuthStore>().signInWithApple()) {
                      //           if (context.mounted) context.router.replace(const MainScaffoldRoute());
                      //           // } else {
                      //           //   if (context.mounted) {
                      //           //     ScaffoldMessenger.of(context).showSnackBar(
                      //           //       const SnackBar(
                      //           //         content: Text('Invalid credentials'),
                      //           //       ),
                      //           //     );
                      //           //   }
                      //           // }
                      //         },
                      //         child: Container(
                      //           height: 48,
                      //           width: double.infinity,
                      //           decoration: BoxDecoration(
                      //             borderRadius: BorderRadius.circular(8),
                      //             border: Border.all(color: Palette().textColor(context)), // Set the border color to white
                      //             color: Colors.transparent, // Set the background color to transparent
                      //           ),
                      //           child: Row(
                      //             mainAxisAlignment: MainAxisAlignment.center,
                      //             children: [
                      //               SvgPicture.asset(
                      //                 'assets/svgs/apple.svg',
                      //                 width: 20,
                      //                 height: 20,
                      //               ),
                      //               const SizedBox(width: 8),
                      //               const Text(
                      //                 'Continue with Linkedin',
                      //                 style: Typo.bodyMedium,
                      //               ),
                      //             ],
                      //           ),
                      //         ),
                      //       ),
                      //     ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text('Already have an account?'),
                          TextButton(
                            child: Text('Login', style: Typo.labelLarge.copyWith(color: Palette().textColor(context))),
                            onPressed: () {
                              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => LoginScreen()));
                            },
                          ),
                        ],
                      ),
                      const SizedBox(height: 50),
                    ],
                  )
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
