
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

import '../../../utils/palette.dart';

class BottomNavItem extends StatelessWidget {
  const BottomNavItem({
    super.key,
    required this.index,
    required this.onTap,
    required this.icon,
    required this.label,
    required this.selectedIndex,
  });

  final int selectedIndex;
  final int index;
  final VoidCallback onTap;
  final String icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    final bool isSelected = index == selectedIndex;
    final bool isDark = Theme.of(context).brightness == Brightness.dark;
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          color: isDark ? Palette.pureBlack : Palette.white,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SvgPicture.asset(
                icon,
                colorFilter: ColorFilter.mode(
                  isSelected
                      ? Palette.primary
                      : isDark
                          ? Palette.grey
                          : Palette.black,
                  BlendMode.srcIn,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                label,
                style: TextStyle(
                  color: isSelected
                      ? Palette.primary
                      : isDark
                          ? Palette.grey
                          : Palette.black,
                  fontSize: 10,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
