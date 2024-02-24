import 'package:flutter/material.dart';
import 'package:widget_arrows/widget_arrows.dart';

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

// List to keep track of widgets and their positions
  List<WidgetPosition> widgets = [];

  @override
  void initState() {
    super.initState();
    // Initialize your draggable widgets here
    widgets.add(
      WidgetPosition(
        left: 150,
        top: 550,
        widget: SizedBox(
          width: 100,
          height: 100,
          child: Stack(
            children: [
              Align(
                alignment: Alignment.topCenter,
                child: ArrowElement(
                  id: 'docker',
                  show: showArrows,
                  color: Colors.red,
                  width: 2,
                  child: Container(),
                ),
              ),
              Image.asset(
                'assets/dockers/docker.png',
                width: 100,
                height: 100,
              ),
            ],
          ),
        ),
      ),
    );
    widgets.add(
      WidgetPosition(
        left: 20,
        top: 80,
        widget: ArrowElement(
          targetAnchor: Alignment.topCenter,
          sourceAnchor: Alignment.bottomCenter,
          id: 'python',
          targetId: 'docker',
          width: 2,
          color: Colors.red,
          show: showArrows,
          child: Image.asset(
            'assets/dockers/python.png',
            width: 100,
            height: 100,
          ),
        ),
      ),
    );
    widgets.add(
      WidgetPosition(
        left: 280,
        top: 120,
        widget: ArrowElement(
          targetAnchor: Alignment.topCenter,
          sourceAnchor: Alignment.bottomCenter,
          id: 'nginx',
          targetId: 'docker',
          width: 2,
          color: Colors.red,
          show: showArrows,
          child: Image.asset(
            'assets/dockers/nginx.png',
            width: 80,
            height: 80,
          ),
        ),
      ),
    );
    widgets.add(
      WidgetPosition(
        left: 150,
        top: 200,
        widget: ArrowElement(
          targetAnchor: Alignment.topCenter,
          sourceAnchor: Alignment.bottomCenter,
          id: 'node',
          targetId: 'docker',
          width: 2,
          color: Colors.red,
          show: showArrows,
          child: Image.asset(
            'assets/dockers/node.png',
            width: 80,
            height: 80,
          ),
        ),
      ),
    );
    // Add more widgets if needed
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        body: Scaffold(
          appBar: AppBar(
            title: const Text('DockWatch'),
            actions: [
              IconButton(
                onPressed: () {},
                icon: const Icon(Icons.person),
              ),
            ],
          ),
          body: ArrowContainer(
            child: Stack(
              children: widgets.map((item) {
                return Positioned(
                  left: item.left,
                  top: item.top,
                  child: Draggable(
                    feedback: item.widget,
                    childWhenDragging: Container(),
                    onDragEnd: (dragDetails) {
                      setState(() {
                        item.left = dragDetails.offset.dx;
                        item.top = dragDetails.offset.dy - AppBar().preferredSize.height - MediaQuery.of(context).padding.top;
                      });
                    },
                    child: item.widget,
                  ),
                );
              }).toList(),
            ),
          ),
          floatingActionButton: FloatingActionButton(
            onPressed: () {},
            child: const Icon(Icons.add),
          ),
        ),
      ),
    );
  }
}

class WidgetPosition {
  double left;
  double top;
  Widget widget;

  WidgetPosition({required this.left, required this.top, required this.widget});
}
