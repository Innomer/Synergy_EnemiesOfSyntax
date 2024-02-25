import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import 'const.dart';

class RecentsScreen extends StatefulWidget {
  RecentsScreen({Key? key}) : super(key: key);

  @override
  State<RecentsScreen> createState() => _RecentsScreenState();
}

class _RecentsScreenState extends State<RecentsScreen> {
  final TextEditingController searchController = TextEditingController();

  String searchQuery = '';
  var gotPermission = false;
  var isMoving = false;
  var fullScreen = false;
  var isSearching = false;

  final List<String> fileNames = [
    'blueprints_2022-01-01',
    'construction_site_2022-01-02',
    'structural_analysis_2022-01-03',
    'building_permit_2022-01-04',
    'site_plan_2022-01-05',
    'electrical_design_2022-01-06',
    'plumbing_layout_2022-01-07',
    'HVAC_system_2022-01-08',
    'material_specifications_2022-01-09',
    'cost_estimate_2022-01-10',
  ];

  final List<String> fileSizes = [
    '1.2 MB',
    '1.5 MB',
    '0.8 MB',
    '2.3 MB',
    '1.7 MB',
    '1.1 MB',
    '0.9 MB',
    '1.4 MB',
    '1.6 MB',
    '2.0 MB',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Recent Files'),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10),
        child: Column(
          children: [
            Container(
              height: 40,
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: TextField(
                onChanged: (value) {
                  setState(() {
                    isSearching = true;
                    searchQuery = value;
                    if (searchQuery.isEmpty || searchQuery == "" || searchQuery == " ") {
                      isSearching = false;
                    }
                  });
                },
                decoration: InputDecoration(
                  suffixIcon: const Icon(Icons.search),
                  filled: true,
                  fillColor: Colors.grey[900],
                  hintText: 'Search Files',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16.0),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              height: 20.h,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  // fileTypeWidget("Document", "${myController.documentSize.toStringAsFixed(2)} MB", "assets/3d/folder-dynamic-color.png", orange),
                  // fileTypeWidget("Videos", "${myController.videoSize.toStringAsFixed(2)} MB", "assets/3d/video-camera-iso-color.png", yellow),
                  // fileTypeWidget("Images", "${myController.imageSize.toStringAsFixed(2)} MB", "assets/3d/Image_perspective_matte.png", black),
                  // fileTypeWidget("Music", "${myController.soundSize.toStringAsFixed(2)} MB", "assets/3d/Music_perspective_matte.png", orange),
                  FileTypeWidget(
                    type: 'Document',
                    size: '1.2 MB',
                    iconPath: 'assets/3d/folder-dynamic-color.png',
                    color: orange,
                  ),
                  FileTypeWidget(
                    type: 'Videos',
                    size: '8.2 MB',
                    iconPath: 'assets/3d/video-camera-iso-color.png',
                    color: yellow,
                  ),
                  FileTypeWidget(
                    type: 'Images',
                    size: '2.2 MB',
                    iconPath: 'assets/3d/Image_perspective_matte.png',
                    color: black,
                  ),
                  FileTypeWidget(
                    type: 'Audio',
                    size: '15.6 MB',
                    iconPath: 'assets/3d/Music_perspective_matte.png',
                    color: orange,
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Recent Files",
                      style: TextStyle(
                        fontSize: 10.sp,
                        fontWeight: FontWeight.w600,
                      )),
                  InkWell(
                    onTap: () {
                      fullScreen = true;
                      setState(() {});
                    },
                    child: Text(
                      "See All",
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 8.sp,
                      ),
                    ),
                  )
                ],
              ),
            ),
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 0),
                itemCount: 5,
                itemBuilder: (context, index) {
                  return Ink(
                    color: Colors.transparent,
                    child: ListTile(
                      trailing: PopupMenuButton(
                          itemBuilder: (BuildContext context) {
                            return <PopupMenuEntry>[
                              PopupMenuItem(
                                value: 'button1',
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Icon(Icons.delete, color: orange),
                                    const Text("Delete"),
                                  ],
                                ),
                              ),
                              PopupMenuItem(
                                value: 'button2',
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Icon(Icons.rotate_left_sharp, color: yellow),
                                    const Text("Rename"),
                                  ],
                                ),
                              ),
                              PopupMenuItem(
                                value: 'button3',
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Icon(Icons.move_down_rounded, color: black),
                                    const Text("Move"),
                                  ],
                                ),
                              )
                            ];
                          },
                          onSelected: (value) async {
                            switch (value) {
                              case 'button1':
                              case 'button2':
                                showDialog(
                                  context: context,
                                  builder: (context) {
                                    TextEditingController renameController = TextEditingController();
                                    return AlertDialog(
                                      title: Text("Rename"),
                                      content: TextField(
                                        controller: renameController,
                                      ),
                                      actions: [
                                        TextButton(
                                          onPressed: () {
                                            Navigator.pop(context);
                                          },
                                          child: const Text("Cancel"),
                                        ),
                                        TextButton(
                                          onPressed: () async {},
                                          child: const Text("Rename"),
                                        ),
                                      ],
                                    );
                                  },
                                );

                                break;
                              case 'button3':
                                break;
                            }
                          },
                          child: const Icon(Icons.more_vert)),
                      leading: true
                          ? Card(
                              color: yellow,
                              elevation: 0,
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Image.asset("assets/3d/copy-dynamic-premium.png"),
                              ),
                            )
                          : Card(
                              color: orange,
                              elevation: 0,
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Image.asset("assets/3d/folder-dynamic-color.png"),
                              ),
                            ),
                      title: Text(
                        fileNames[index],
                        style: TextStyle(
                          fontStyle: FontStyle.italic,
                          fontSize: 10.sp,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      subtitle: Text(
                        fileSizes[index],
                        style: TextStyle(
                          color: Colors.grey,
                          fontSize: 8.sp,
                        ),
                      ),
                      onTap: () async {},
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class FileTypeWidget extends StatelessWidget {
  const FileTypeWidget({
    super.key,
    required this.type,
    required this.size,
    required this.iconPath,
    required this.color,
  });

  final String type;
  final String size;
  final String iconPath;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(26),
        child: Stack(
          children: [
            Container(
              height: 20.h,
              width: 38.w,
              decoration: BoxDecoration(
                color: color == orange ? orange.withOpacity(0.8) : color,
                borderRadius: BorderRadius.circular(26),
              ),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(type,
                        style: TextStyle(
                          color: color == yellow ? Colors.black : Colors.white,
                          fontSize: 10.sp,
                          fontWeight: FontWeight.w600,
                        )),
                    Text(size,
                        style: TextStyle(
                          color: color == orange ? Colors.black.withOpacity(0.5) : Colors.grey,
                          fontWeight: FontWeight.w500,
                        )),
                  ],
                ),
              ),
            ),
            Positioned(
              right: -30,
              bottom: -50,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Image.asset(iconPath, height: 20.h, width: 30.w, fit: BoxFit.contain),
              ),
            )
          ],
        ),
      ),
    );
  }
}
