import 'package:flutter/material.dart';

import '../sidebar/page/sidebar_menu.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int selectedChipIndex = 0;
  bool isScrolled = false;
  double scrollOffset = 0;

  bool showArrows = true;

  @override
  void initState() {
    super.initState();
    // Initialize your draggable widgets here
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        body: Scaffold(
          appBar: AppBar(
            title: const Text('Home Screen'),
            actions: [
              IconButton(
                onPressed: () {
                  // Open Drawer

                  Scaffold.of(context).openDrawer();
                },
                icon: const Icon(Icons.person),
              ),
            ],
          ),
          body: const Center(
            child: Text('Home Screen'),
          ),
          drawer: TreeViewDrawer(),
          floatingActionButton: FloatingActionButton(
            onPressed: () {},
            child: const Icon(Icons.add),
          ),
        ),
      ),
    );
  }
}

class TreeViewDrawer extends StatelessWidget {
  const TreeViewDrawer({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SidebarMenu(),
    );
  }
}
