import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:synergy/features/main/widgets/bottom_nav_item.dart';
import 'package:synergy/features/projects/projects_screen.dart';
import 'package:synergy/features/recents/recents_screen.dart';

import '../chat/pages/home/groupchat.dart';
import '../home/home_screen.dart';

enum _SelectedTab { home, favorite, add, search, person }

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

  var _selectedTab = _SelectedTab.home;

  void _handleIndexChanged(int i) {
    setState(() {
      _selectedTab = _SelectedTab.values[i];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: pageController,
        physics: const NeverScrollableScrollPhysics(),
        children: [
          const HomeScreen(),
          const ProjectsScreen(),
          RecentsScreen(),
          const ChatScreen(),
        ],
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.only(bottom: 28, top: 8),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            BottomNavItem(
                selectedIndex: selectedIndex,
                icon: 'assets/svgs/feed.svg',
                label: "Home",
                index: 0,
                onTap: () {
                  setState(() {
                    selectedIndex = 0;
                    pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
                  });
                  HapticFeedback.lightImpact();
                }),
            BottomNavItem(
              selectedIndex: selectedIndex,
              icon: 'assets/svgs/project.svg',
              label: "Projects",
              index: 1,
              onTap: () {
                setState(() {
                  selectedIndex = 1;
                  pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
                });
                HapticFeedback.lightImpact();
              },
            ),
            BottomNavItem(
              selectedIndex: selectedIndex,
              icon: 'assets/svgs/recent.svg',
              label: "Recents",
              index: 2,
              onTap: () {
                setState(() {
                  selectedIndex = 2;
                  pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
                });
                HapticFeedback.lightImpact();
              },
            ),
            // BottomNavItem(
            //   selectedIndex: selectedIndex,
            //   icon: 'assets/svgs/stars.svg',
            //   label: "Learnings",
            //   index: 3,
            //   onTap: () {
            //     setState(() {
            //       selectedIndex = 3;
            //       pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
            //     });
            //     HapticFeedback.lightImpact();
            //   },
            // ),
            BottomNavItem(
              selectedIndex: selectedIndex,
              icon: 'assets/svgs/chat.svg',
              label: "Team Chat",
              index: 3,
              onTap: () {
                setState(() {
                  selectedIndex = 3;
                  pageController.animateToPage(selectedIndex, duration: const Duration(milliseconds: 200), curve: Curves.easeIn);
                });
                HapticFeedback.lightImpact();
              },
            ),
          ],
        ),
      ),
    );
  }
}
