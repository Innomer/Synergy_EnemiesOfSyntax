library dashboard;

import 'dart:io';
import 'dart:math';

import 'package:eva_icons_flutter/eva_icons_flutter.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:gap/gap.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';
import 'package:synergy/utils/utils.dart';

import '../../../../../../../logic/stores/project_store.dart';
import '../../../../constans/app_constants.dart';
import '../../../../shared_components/chatting_card.dart';
import '../../../../shared_components/get_premium_card.dart';
import '../../../../shared_components/list_profil_image.dart';
import '../../../../shared_components/progress_card.dart';
import '../../../../shared_components/progress_report_card.dart';
import '../../../../shared_components/project_card.dart';
import '../../../../shared_components/responsive_builder.dart';
import '../../../../shared_components/search_field.dart';
import '../../../../shared_components/selection_button.dart';
import '../../../../shared_components/task_card.dart';
import '../../../../shared_components/today_text.dart';
import '../../../../shared_components/upgrade_premium_card.dart';
import '../../../../utils/helpers/app_helpers.dart';

// binding
part '../../bindings/dashboard_binding.dart';
// controller
part '../../controllers/dashboard_controller.dart';
// models
part '../../models/profile.dart';
// component
part '../components/active_project_card.dart';
part '../components/header.dart';
part '../components/overview_header.dart';
part '../components/profile_tile.dart';
part '../components/recent_messages.dart';
part '../components/sidebar.dart';
part '../components/team_member.dart';

class DashboardScreen extends GetView<DashboardController> {
  DashboardScreen({super.key});

  final TextEditingController addProjectController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: controller.scaffoldKey,
      drawer: (ResponsiveBuilder.isDesktop(context))
          ? null
          : Drawer(
              child: Padding(
                padding: const EdgeInsets.only(top: kSpacing),
                child: _Sidebar(data: controller.getSelectedProject()),
              ),
            ),
      body: SingleChildScrollView(
          child: ResponsiveBuilder(
        mobileBuilder: (context, constraints) {
          return Column(children: [
            const SizedBox(height: kSpacing * (kIsWeb ? 1 : 2)),
            _buildHeader(onPressedMenu: () => controller.openDrawer()),
            const SizedBox(height: kSpacing / 2),
            const Divider(),
            _buildProfile(data: controller.getProfil()),
            const SizedBox(height: kSpacing),
            _buildProgress(axis: Axis.vertical),
            const SizedBox(height: kSpacing),
            _buildTeamMember(data: controller.getMember()),
            const SizedBox(height: kSpacing),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: kSpacing),
              child: GetPremiumCard(onPressed: () {}),
            ),
            const SizedBox(height: kSpacing * 2),
            _buildTaskOverview(
              data: controller.getAllTask(),
              headerAxis: Axis.vertical,
              crossAxisCount: 6,
              crossAxisCellCount: 6,
            ),
            const SizedBox(height: kSpacing * 2),
            _buildActiveProject(
              context: context,
              data: controller.getActiveProject(),
              crossAxisCount: 6,
              crossAxisCellCount: 6,
            ),
            const SizedBox(height: kSpacing),
            _buildRecentMessages(data: controller.getChatting()),
          ]);
        },
        tabletBuilder: (context, constraints) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Flexible(
                flex: (constraints.maxWidth < 950) ? 6 : 9,
                child: Column(
                  children: [
                    const SizedBox(height: kSpacing * (kIsWeb ? 1 : 2)),
                    _buildHeader(onPressedMenu: () => controller.openDrawer()),
                    const SizedBox(height: kSpacing * 2),
                    _buildProgress(
                      axis: (constraints.maxWidth < 950) ? Axis.vertical : Axis.horizontal,
                    ),
                    const SizedBox(height: kSpacing * 2),
                    _buildTaskOverview(
                      data: controller.getAllTask(),
                      headerAxis: (constraints.maxWidth < 850) ? Axis.vertical : Axis.horizontal,
                      crossAxisCount: 6,
                      crossAxisCellCount: (constraints.maxWidth < 950)
                          ? 6
                          : (constraints.maxWidth < 1100)
                              ? 3
                              : 2,
                    ),
                    const SizedBox(height: kSpacing * 2),
                    _buildActiveProject(
                      context: context,
                      data: controller.getActiveProject(),
                      crossAxisCount: 6,
                      crossAxisCellCount: (constraints.maxWidth < 950)
                          ? 6
                          : (constraints.maxWidth < 1100)
                              ? 3
                              : 2,
                    ),
                    const SizedBox(height: kSpacing),
                  ],
                ),
              ),
              Flexible(
                flex: 4,
                child: Column(
                  children: [
                    const SizedBox(height: kSpacing * (kIsWeb ? 0.5 : 1.5)),
                    _buildProfile(data: controller.getProfil()),
                    const Divider(thickness: 1),
                    const SizedBox(height: kSpacing),
                    _buildTeamMember(data: controller.getMember()),
                    const SizedBox(height: kSpacing),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: kSpacing),
                      child: GetPremiumCard(onPressed: () {}),
                    ),
                    const SizedBox(height: kSpacing),
                    const Divider(thickness: 1),
                    const SizedBox(height: kSpacing),
                    _buildRecentMessages(data: controller.getChatting()),
                  ],
                ),
              )
            ],
          );
        },
        desktopBuilder: (context, constraints) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Flexible(
                flex: (constraints.maxWidth < 1360) ? 4 : 3,
                child: ClipRRect(
                    borderRadius: const BorderRadius.only(
                      topRight: Radius.circular(kBorderRadius),
                      bottomRight: Radius.circular(kBorderRadius),
                    ),
                    child: _Sidebar(data: controller.getSelectedProject())),
              ),
              Flexible(
                flex: 9,
                child: Column(
                  children: [
                    const SizedBox(height: kSpacing),
                    _buildHeader(),
                    const SizedBox(height: kSpacing * 2),
                    _buildProgress(),
                    const SizedBox(height: kSpacing * 2),
                    _buildTaskOverview(
                      data: controller.getAllTask(),
                      crossAxisCount: 6,
                      crossAxisCellCount: (constraints.maxWidth < 1360) ? 3 : 2,
                    ),
                    const SizedBox(height: kSpacing * 2),
                    _buildActiveProject(
                      context: context,
                      data: controller.getActiveProject(),
                      crossAxisCount: 6,
                      crossAxisCellCount: (constraints.maxWidth < 1360) ? 3 : 2,
                    ),
                    const SizedBox(height: kSpacing),
                  ],
                ),
              ),
              Flexible(
                flex: 4,
                child: Column(
                  children: [
                    const SizedBox(height: kSpacing / 2),
                    _buildProfile(data: controller.getProfil()),
                    const Divider(thickness: 1),
                    const SizedBox(height: kSpacing),
                    _buildTeamMember(data: controller.getMember()),
                    const SizedBox(height: kSpacing),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: kSpacing),
                      child: GetPremiumCard(onPressed: () {}),
                    ),
                    const SizedBox(height: kSpacing),
                    const Divider(thickness: 1),
                    const SizedBox(height: kSpacing),
                    _buildRecentMessages(data: controller.getChatting()),
                  ],
                ),
              )
            ],
          );
        },
      )),
    );
  }

  Widget _buildHeader({Function()? onPressedMenu}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: kSpacing),
      child: Row(
        children: [
          if (onPressedMenu != null)
            Padding(
              padding: const EdgeInsets.only(right: kSpacing),
              child: IconButton(
                onPressed: onPressedMenu,
                icon: const Icon(EvaIcons.menu),
                tooltip: "menu",
              ),
            ),
          const Expanded(child: _Header()),
        ],
      ),
    );
  }

  Widget _buildProgress({Axis axis = Axis.horizontal}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: kSpacing),
      child: (axis == Axis.horizontal)
          ? Row(
              children: [
                Flexible(
                  flex: 5,
                  child: ProgressCard(
                    data: const ProgressCardData(
                      totalUndone: 10,
                      totalTaskInProress: 2,
                    ),
                    onPressedCheck: () {},
                  ),
                ),
                const SizedBox(width: kSpacing / 2),
                const Flexible(
                  flex: 4,
                  child: ProgressReportCard(
                    data: ProgressReportCardData(
                      title: "1st Sprint",
                      doneTask: 5,
                      percent: .3,
                      task: 3,
                      undoneTask: 2,
                    ),
                  ),
                ),
              ],
            )
          : Column(
              children: [
                ProgressCard(
                  data: const ProgressCardData(
                    totalUndone: 10,
                    totalTaskInProress: 2,
                  ),
                  onPressedCheck: () {},
                ),
                const SizedBox(height: kSpacing / 2),
                const ProgressReportCard(
                  data: ProgressReportCardData(
                    title: "1st Sprint",
                    doneTask: 5,
                    percent: .3,
                    task: 3,
                    undoneTask: 2,
                  ),
                ),
              ],
            ),
    );
  }

  Widget _buildTaskOverview({
    required List<TaskCardData> data,
    int crossAxisCount = 6,
    int crossAxisCellCount = 2,
    Axis headerAxis = Axis.horizontal,
  }) {
    return StaggeredGridView.countBuilder(
      crossAxisCount: crossAxisCount,
      itemCount: data.length + 1,
      addAutomaticKeepAlives: false,
      padding: const EdgeInsets.symmetric(horizontal: kSpacing),
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemBuilder: (context, index) {
        return (index == 0)
            ? Padding(
                padding: const EdgeInsets.only(bottom: kSpacing),
                child: _OverviewHeader(
                  axis: headerAxis,
                  onSelected: (task) {},
                ),
              )
            : TaskCard(
                data: data[index - 1],
                onPressedMore: () {},
                onPressedTask: () {},
                onPressedContributors: () {},
                onPressedComments: () {},
              );
      },
      staggeredTileBuilder: (int index) => StaggeredTile.fit((index == 0) ? crossAxisCount : crossAxisCellCount),
    );
  }

  Widget _buildActiveProject({
    required BuildContext context,
    required List<ProjectCardData> data,
    int crossAxisCount = 6,
    int crossAxisCellCount = 2,
  }) {
    return _ActiveProjectCard(
      onPressedSeeAll: () {},
      child: Container(
        width: double.infinity,
        // color: Colors.red,
        padding: EdgeInsets.all(16),
        child: Wrap(
          spacing: 16,
          runSpacing: 20,
          alignment: WrapAlignment.spaceBetween,
          children: [
            GestureDetector(
              onTap: () async {
                // Config config = new Config();
                // PdftronFlutter.openDocument("https://www.pdftron.com/webviewer/demo/gallery/Report_2011.pdf", config: config);

                void _showAddProjectModal(BuildContext context) {
                  showModalBottomSheet(
                    context: context,
                    builder: (BuildContext context) {
                      return Container(
                        height: MediaQuery.of(context).size.height * 0.8,
                        padding: EdgeInsets.all(16),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            TextFormField(
                              controller: addProjectController,
                              decoration: InputDecoration(
                                hintText: 'Enter project name',
                              ),
                            ),
                            SizedBox(height: 16),
                            ElevatedButton(
                              onPressed: () async {
                                FilePickerResult? result = await FilePicker.platform.pickFiles();

                                if (result != null) {
                                  File file = File(result.files.single.path!);
                                  context.read<ProjectStore>().uploadFile(file.path);
                                } else {
                                  // User canceled the file picking
                                }

                                context.read<ProjectStore>().projects.add(addProjectController.text);
                                context.read<ProjectStore>().notifyListeners();
                                Navigator.of(context).pop();
                              },
                              child: Text('Add Project'),
                            ),
                          ],
                        ),
                      );
                    },
                  );
                }

                // _showAddProjectModal(context);

                FilePickerResult? result = await FilePicker.platform.pickFiles();

                if (result != null) {
                  File file = File(result.files.single.path!);
                  context.read<ProjectStore>().uploadFile(file.path);
                } else {
                  // User canceled the file picking
                }
              },
              child: Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: Colors.grey[800],
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.add, color: Colors.white),
                      Gap(8),
                      Text('Add File', style: TextStyle(color: Colors.white)),
                    ],
                  ),
                ),
              ),
            ),
            for (int i = 0; i < context.watch<ProjectStore>().projects.length; i++) FileItem(title: 'Project ${context.watch<ProjectStore>().projects[i]}'),
          ],
        ),
      ),
    );
  }
  // Widget _buildActiveProject({
  //   required List<ProjectCardData> data,
  //   int crossAxisCount = 6,
  //   int crossAxisCellCount = 2,
  // }) {
  //   return Padding(
  //     padding: const EdgeInsets.symmetric(horizontal: kSpacing),
  //     child: _ActiveProjectCard(
  //       onPressedSeeAll: () {},
  //       child: StaggeredGridView.countBuilder(
  //         physics: const NeverScrollableScrollPhysics(),
  //         crossAxisCount: crossAxisCount,
  //         itemCount: data.length,
  //         addAutomaticKeepAlives: false,
  //         mainAxisSpacing: kSpacing,
  //         crossAxisSpacing: kSpacing,
  //         shrinkWrap: true,
  //         itemBuilder: (context, index) {
  //           return ProjectCard(data: data[index]);
  //         },
  //         staggeredTileBuilder: (int index) => StaggeredTile.fit(crossAxisCellCount),
  //       ),
  //     ),
  //   );
  // }

  Widget _buildProfile({required _Profile data}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: kSpacing),
      child: _ProfilTile(
        data: data,
        onPressedNotification: () {},
      ),
    );
  }

  Widget _buildTeamMember({required List<ImageProvider> data}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: kSpacing),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _TeamMember(
            totalMember: data.length,
            onPressedAdd: () {},
          ),
          const SizedBox(height: kSpacing / 2),
          ListProfilImage(maxImages: 6, images: data),
        ],
      ),
    );
  }

  Widget _buildRecentMessages({required List<ChattingCardData> data}) {
    return Column(children: [
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: kSpacing),
        child: _RecentMessages(onPressedMore: () {}),
      ),
      const SizedBox(height: kSpacing / 2),
      ...data
          .map(
            (e) => ChattingCard(data: e, onPressed: () {}),
          )
          .toList(),
    ]);
  }
}

class FileItem extends StatelessWidget {
  FileItem({
    super.key,
    required this.title,
  });

  final String title;

  final List<Color> colors = [
    Colors.red,
    Colors.blue,
    Colors.green,
    Colors.purple,
    Colors.orange,
    Colors.teal,
    Colors.pink,
    Colors.indigo,
    Colors.amber,
    Colors.cyan,
  ];

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        // Config config = new Config();
        // PdftronFlutter.openDocument("https://www.pdftron.com/webviewer/demo/gallery/Report_2011.pdf", config: config);

        //  Nav to DashboardScreen
        Get.put(DashboardController());
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => DashboardScreen()));
      },
      child: Container(
        width: 120,
        height: 120,
        decoration: BoxDecoration(
          color: colors[Random().nextInt(colors.length)],
          borderRadius: BorderRadius.circular(16),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(title, style: const TextStyle(color: Colors.white)),
            ],
          ),
        ),
      ),
    );
  }
}

class CustomSegmentedControl extends StatefulWidget {
  const CustomSegmentedControl({super.key});

  @override
  CustomSegmentedControlState createState() => CustomSegmentedControlState();
}

class CustomSegmentedControlState extends State<CustomSegmentedControl> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey[800],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildSegment('Date', 0),
          _buildSegment('Name', 1),
          _buildSegment('Type', 2),
        ],
      ),
    );
  }

  Widget _buildSegment(String text, int index) {
    final bool isSelected = _selectedIndex == index;
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedIndex = index;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          color: isSelected ? Colors.grey[600] : Colors.transparent,
        ),
        child: Text(
          text,
          style: TextStyle(
            color: isSelected ? Colors.white : Colors.white54,
            fontSize: 14,
          ),
        ),
      ),
    );
  }
}
