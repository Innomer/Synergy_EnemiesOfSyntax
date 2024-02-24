
import 'package:flutter/material.dart';

import '../utils/palette.dart';
import '../utils/typography.dart';

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    required this.text,
    required this.onTap,
    this.width = double.infinity,
    this.height = 48,
  });

  final String text;
  final VoidCallback onTap;
  final double width;
  final double height;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: height,
        width: width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8.0),
          gradient: Palette.primaryGradient,
        ),
        child: Center(
          child: Text(text, style: Typo.titleLarge),
        ),
      ),
    );
  }
}
