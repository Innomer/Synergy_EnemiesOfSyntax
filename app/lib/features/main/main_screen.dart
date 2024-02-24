import 'package:flutter/material.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  PageController pageController = PageController();
  int selectedIndex = 0;

  @override
  void initState() {
    pageController = PageController(initialPage: selectedIndex);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: pageController,
        physics: const NeverScrollableScrollPhysics(),
        children: [
          // HomeScreen(),
          // ArrowScreen(),
        ],
      ),
      // bottomNavigationBar: Container(
      //   padding: const EdgeInsets.only(bottom: 28, top: 8),
      //   child: Row(
      //     crossAxisAlignment: CrossAxisAlignment.start,
      //     children: [
      //       BottomNavItem(
      //           selectedIndex: selectedIndex,
      //           icon: 'assets/svgs/feed.svg',
      //           label: "Feed",
      //           index: 0,
      //           onTap: () {
      //             setState(() {
      //               selectedIndex = 0;
      //               pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
      //             });
      //             HapticFeedback.lightImpact();
      //           }),
      //       BottomNavItem(
      //         selectedIndex: selectedIndex,
      //         icon: 'assets/svgs/network.svg',
      //         label: "Network",
      //         index: 1,
      //         onTap: () {
      //           setState(() {
      //             selectedIndex = 1;
      //             pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
      //           });
      //           HapticFeedback.lightImpact();
      //         },
      //       ),
      //       BottomNavItem(
      //         selectedIndex: selectedIndex,
      //         icon: 'assets/svgs/bytes.svg',
      //         label: "Bytes",
      //         index: 2,
      //         onTap: () {
      //           setState(() {
      //             selectedIndex = 2;
      //             pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
      //           });
      //           HapticFeedback.lightImpact();
      //         },
      //       ),
      //       BottomNavItem(
      //         selectedIndex: selectedIndex,
      //         icon: 'assets/svgs/stars.svg',
      //         label: "Learnings",
      //         index: 3,
      //         onTap: () {
      //           setState(() {
      //             selectedIndex = 3;
      //             pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
      //           });
      //           HapticFeedback.lightImpact();
      //         },
      //       ),
      //       BottomNavItem(
      //         selectedIndex: selectedIndex,
      //         icon: 'assets/svgs/dashboard.svg',
      //         label: "Dashboard",
      //         index: 4,
      //         onTap: () {
      //           setState(() {
      //             selectedIndex = 4;
      //             pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
      //           });
      //           HapticFeedback.lightImpact();
      //         },
      //       ),
      // ],
      // ),
      // ),
    );
  }
}