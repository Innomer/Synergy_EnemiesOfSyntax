import 'package:flutter/material.dart';
import 'package:synergy/utils/utils.dart';
import 'package:uuid/uuid.dart';

import '../group/group_page.dart';

class ChatScreen extends StatelessWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController nameController = TextEditingController();

    final formKey = GlobalKey<FormState>();
    var uuid = const Uuid();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Docstruct Chat'),
        backgroundColor: Colors.black,
      ),
      body: Center(
        child: TextButton(
          onPressed: () => showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text(
                'Please enter your name',
                style: TextStyle(color: Colors.white),
              ),
              content: Form(
                key: formKey,
                child: TextFormField(
                  controller: nameController,
                  validator: (value) {
                    if (value == null || value.length < 3) {
                      return 'User must have proper name';
                    }

                    return null;
                  },
                ),
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    nameController.clear();
                    Navigator.pop(context);
                  },
                  child: const Text(
                    'Cancel',
                    style: TextStyle(fontSize: 16, color: Colors.green),
                  ),
                ),
                TextButton(
                  onPressed: () {
                    if (formKey.currentState!.validate()) {
                      String name = nameController.text;
                      nameController.clear();
                      Navigator.pop(context);
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => GroupPage(
                                    name: name,
                                    userId: uuid.v1(),
                                  )));
                    }
                  },
                  child: const Text(
                    'Enter',
                    style: TextStyle(fontSize: 16, color: Colors.blue),
                  ),
                ),
              ],
            ),
          ),
          child: const Text(
            'Initiate Docstruct Group Chat',
            style: TextStyle(color: Palette.light, fontSize: 16),
          ),
        ),
      ),
    );
  }
}
