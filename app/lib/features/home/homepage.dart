import 'package:flutter/material.dart';

import 'details.dart';
import 'models/folder.dart';
import 'models/recentfile.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter Demo',
      home: MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  String urlProfile = 'https://as1.ftcdn.net/v2/jpg/01/80/71/30/1000_F_180713020_Dn7jlE2XamYfJp32Bu0QqDwgvhfRxTf0.jpg';

  List<Folder> folders = [
    Folder(folderName: 'Drawings', storage: '6GB', lastEdit: '15-02-2023', colors: '#3a86ff'),
    Folder(folderName: 'Documents', storage: '3GB', lastEdit: '15-02-2023', colors: '#2ec4b6'),
    Folder(folderName: 'Images', storage: '1GB', lastEdit: '15-02-2023', colors: '#ffbe0b'),
    Folder(folderName: 'Trash', storage: '8GB', lastEdit: '15-02-2023', colors: '#fb5607')
  ];

  List<RecentFile> recentfiles = [
    RecentFile(
        fileName: 'Desktop',
        imageUrl: 'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
    RecentFile(
        fileName: 'Laptop', imageUrl: 'https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'),
    RecentFile(
        fileName: 'Laptop', imageUrl: 'https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.only(
                top: 60,
                right: 16,
                left: 16,
                bottom: 16,
              ),
              decoration: const BoxDecoration(color: Colors.blue),
              child: Column(
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(2),
                        decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
                        child: CircleAvatar(
                          radius: 28,
                          backgroundColor: Colors.transparent,
                          backgroundImage: NetworkImage(urlProfile),
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Text(
                        "Hi Dishant!",
                        style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w600),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      const Expanded(
                        flex: 4,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(height: 16),
                            Text(
                              "Docstruct",
                              style: TextStyle(color: Colors.white, fontSize: 25, fontWeight: FontWeight.w800),
                            ),
                            SizedBox(width: 12),
                            Text(
                              "Revolutionize document management for construction teams, integrating advanced solutions for seamless file navigation and collaboration.",
                              style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w400),
                            ),
                          ],
                        ),
                      ),
                      Expanded(
                        flex: 1,
                        child: Image.asset(
                          'assets/images/folderr.png',
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
            GridView.count(
              crossAxisCount: MediaQuery.of(context).size.width >= 600 ? 4 : 2,
              shrinkWrap: true,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              physics: NeverScrollableScrollPhysics(),
              padding: const EdgeInsets.all(20),
              children: [
                for (int i = 0; i < folders.length; i++)
                  InkWell(
                    onTap: () {
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => const DetailPage(),
                      ));
                    },
                    child: Stack(
                      children: [
                        Container(
                          margin: const EdgeInsets.all(4),
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(color: HexColor('${folders[i].colors}').withOpacity(0.1), borderRadius: BorderRadius.circular(16)),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Align(
                                alignment: Alignment.centerRight,
                                child: Text(
                                  "${folders[i].storage}",
                                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
                                ),
                              ),
                              const SizedBox(height: 32),
                              Text(
                                "${folders[i].folderName}",
                                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
                              ),
                              const Divider(
                                color: Colors.white,
                                thickness: 1,
                              ),
                              Text(
                                "Last edit: ${folders[i].lastEdit}",
                                textAlign: TextAlign.center,
                                style: const TextStyle(color: Colors.black45, fontSize: 12, fontWeight: FontWeight.w400),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.all(18),
                          decoration: BoxDecoration(
                            color: HexColor('${folders[i].colors}'),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.folder,
                            color: Colors.white,
                          ),
                        )
                      ],
                    ),
                  )
              ],
            ),
            // Container(
            //   padding: const EdgeInsets.only(left: 16),
            //   child: Text(
            //     "Recent",
            //     style: GoogleFonts.poppins(
            //         fontSize: 20, fontWeight: FontWeight.w700),
            //   ),
            // ),
            // GridView.count(
            //     crossAxisCount: 2,
            //     shrinkWrap: true,
            //     crossAxisSpacing: 10,
            //     mainAxisSpacing: 10,
            //     padding: const EdgeInsets.all(20),
            //     children: [
            //       for (int i = 0; i < recentfiles.length; i++)
            //         Container(
            //           decoration: BoxDecoration(
            //               color: Colors.black12,
            //               borderRadius: BorderRadius.circular(14)),
            //           child: Column(
            //             children: [
            //               Container(
            //                 height: 148,
            //                 child: ClipRRect(
            //                   borderRadius: const BorderRadius.only(
            //                     topRight: Radius.circular(14),
            //                     topLeft: Radius.circular(14),
            //                   ),
            //                   child:
            //                       Image.network('${recentfiles[i].imageUrl}'),
            //                 ),
            //               ),
            //               const SizedBox(height: 8),
            //               Text(
            //                 '${recentfiles[i].fileName}',
            //                 style: GoogleFonts.poppins(
            //                     fontSize: 16, fontWeight: FontWeight.w700),
            //               ),
            //             ],
            //           ),
            //         ),
            //     ]),
          ],
        ),
      ),
    );
  }
}
