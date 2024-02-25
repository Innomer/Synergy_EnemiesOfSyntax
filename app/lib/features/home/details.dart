import 'package:flutter/material.dart';
import 'package:synergy/utils/utils.dart';

import 'models/fileupload.dart';
import 'models/folder.dart';
import 'models/folderstorage.dart';

class DetailPage extends StatefulWidget {
  const DetailPage({super.key});

  @override
  State<DetailPage> createState() => _DetailPageState();
}

class _DetailPageState extends State<DetailPage> {
  List<FileUpload> fileUploads = [
    FileUpload(
        fileName: 'image_a.png',
        url: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
        progress: 0.4,
        progressSize: "10KB",
        progressMax: "120KB"),
    FileUpload(
        fileName: 'file_doc.docs',
        url: 'https://images.unsplash.com/photo-1542345307-d87fd97e0ed5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        progress: 0.6,
        progressSize: "16KB",
        progressMax: "80KB"),
    FileUpload(
        fileName: 'file_ab.pdf',
        url: 'https://images.unsplash.com/photo-1623276527153-fa38c1616b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
        progress: 0.9,
        progressSize: "15KB",
        progressMax: "12KB"),
  ];

  List<FolderStorage> folderStorage = [
    FolderStorage(folderName: 'Architectural,', storage: '5GB', colors: '#fb5607'),
    FolderStorage(folderName: 'Structural', storage: '2GB', colors: '#ffbe0b'),
    FolderStorage(folderName: 'Hydraulic', storage: '4GB', colors: '#2ec4b6'),
    FolderStorage(folderName: 'Electrical,', storage: '3GB', colors: '#3a86ff'),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: const Color(0xfff5f6fd),
      // floatingActionButton: FloatingActionButton(
      //   onPressed: () {},
      //   backgroundColor: const Color(0xff2685f9),
      //   child: const Icon(Icons.add),
      // ),
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: MediaQuery.of(context).size.width,
                  padding: const EdgeInsets.only(top: 16, left: 16, right: 16),
                  decoration: const BoxDecoration(color: Color(0xff2685f9)),
                  child: const SafeArea(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 40),
                        Text(
                          "Drawings",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 28,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          "Segregate into separate folders for each type of drawing, which can be in PDF or DWG format: Architectural, Structural, Hydraulic, Electrical, Civil, etc.",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  width: MediaQuery.of(context).size.width,
                  padding: const EdgeInsets.all(16),
                  margin: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Palette.black,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    children: [
                      for (int i = 0; i < fileUploads.length; i++)
                        Padding(
                          padding: const EdgeInsets.only(top: 8, bottom: 8),
                          child: Row(
                            children: [
                              ClipRRect(
                                borderRadius: BorderRadius.circular(6),
                                child: SizedBox.fromSize(
                                  size: const Size.fromRadius(18),
                                  child: Image.network('${fileUploads[i].url}'),
                                ),
                              ),
                              const SizedBox(width: 4),
                              Text(
                                '${fileUploads[i].fileName}',
                                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w400),
                              ),
                              const Spacer(),
                              Column(
                                children: [
                                  Text(
                                    "${fileUploads[i].progressSize} of ${fileUploads[i].progressMax}",
                                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w400),
                                  ),
                                  const SizedBox(height: 4),
                                  SizedBox(
                                    width: 100,
                                    child: LinearProgressIndicator(
                                      color: Colors.blue,
                                      value: fileUploads[i].progress,
                                      backgroundColor: Colors.black12,
                                      minHeight: 6,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(width: 4),
                              InkWell(
                                onTap: () {
                                  //onpress
                                },
                                child: Container(
                                  padding: const EdgeInsets.all(4),
                                  decoration: const BoxDecoration(color: Colors.black12, shape: BoxShape.circle),
                                  child: const Icon(
                                    Icons.close,
                                    size: 16,
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
                // Container(
                //   padding: const EdgeInsets.only(left: 16),
                //   child: Text(
                //     "Folders",
                //     style: GoogleFonts.poppins(
                //         fontSize: 20, fontWeight: FontWeight.w700),
                //   ),
                // ),
                GridView.count(
                  crossAxisCount: MediaQuery.of(context).size.width >= 600 ? 4 : 2,
                  shrinkWrap: true,
                  crossAxisSpacing: 10,
                  physics: NeverScrollableScrollPhysics(),
                  mainAxisSpacing: 10,
                  padding: const EdgeInsets.all(15),
                  children: [
                    for (int i = 0; i < folderStorage.length; i++)
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Palette.black,
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(
                                  Icons.star,
                                  color: Colors.yellow,
                                ),
                                Container(
                                  padding: const EdgeInsets.all(22),
                                  decoration: BoxDecoration(color: HexColor("${folderStorage[i].colors}").withOpacity(0.1), borderRadius: BorderRadius.circular(14)),
                                  child: Icon(
                                    Icons.folder,
                                    color: HexColor("${folderStorage[i].colors}"),
                                    size: 32,
                                  ),
                                ),
                                const Icon(
                                  Icons.more_vert,
                                ),
                              ],
                            ),
                            const SizedBox(
                              height: 8,
                            ),
                            Text(
                              "${folderStorage[i].folderName}",
                              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                            ),
                            Text(
                              "${folderStorage[i].storage}",
                              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                            ),
                          ],
                        ),
                      )
                  ],
                ),
              ],
            ),
          ),
          SafeArea(
            child: Container(
              padding: const EdgeInsets.all(14),
              child: Row(
                children: [
                  InkWell(
                    onTap: () {
                      Navigator.of(context).pop();
                    },
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(
                        Icons.arrow_back,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const Spacer(),
                  InkWell(
                    onTap: () {
                      Navigator.of(context).pop();
                    },
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Text(
                        "Select",
                        style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500),
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: () {
                      Navigator.of(context).pop();
                    },
                    child: Container(
                      margin: const EdgeInsets.only(left: 14),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(color: Colors.white.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                      child: const Icon(
                        Icons.menu,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: () {
                      Navigator.of(context).pop();
                    },
                    child: Container(
                      margin: const EdgeInsets.only(left: 14),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(color: Colors.white.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                      child: const Icon(
                        Icons.search,
                        color: Colors.white,
                      ),
                    ),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
