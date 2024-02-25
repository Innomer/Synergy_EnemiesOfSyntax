import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

import '../../foundation/msg_widget/other_msg_widget.dart';
import '../../foundation/msg_widget/own_msg_widget.dart';
import 'msg_model.dart';

class GroupPage extends StatefulWidget {
  final String name;
  final String userId;
  const GroupPage({Key? key, required this.name, required this.userId})
      : super(key: key);

  @override
  State<GroupPage> createState() => _GroupPageState();
}

class _GroupPageState extends State<GroupPage> {
  //Inicializar socket
  IO.Socket? socket;
  List<MsgModel> listMsg = [];
  final TextEditingController _msgController = TextEditingController();

  @override
  void initState() {
    super.initState();
    connect();
  }

  //Conexión con el soecket del backend
  void connect() {
    //Colocar el host donde está alojado el servidor
    socket =
        IO.io('https://socket-io-chat-ma9w.onrender.com/', <String, dynamic>{
      "transports": ["websocket"],
      "autoconnect": false,
    });
    socket!.connect();
    // ignore: avoid_print
    print('we re here');
    socket!.onConnect((_) {
      // ignore: avoid_print
      print('connect');
      socket!.on('sendMsgServer', (msg) {
        // ignore: avoid_print
        print(msg);
        //Comprar el id del usuario, para que los mensajes no se dupliquen entre el own y el send
        if (msg['userId'] != widget.userId) {
          setState(() {
            listMsg.add(MsgModel(
                msg: msg['msg'], type: msg['type'], sender: msg['senderName']));
          });
        }
      });
    });
  }

  void sendMsg(String msg, String senderName) {
    MsgModel ownMsg = MsgModel(msg: msg, type: "ownMsg", sender: senderName);
    listMsg.add(ownMsg);
    setState(() {
      listMsg;
    });
    socket!.emit('sendMsg', {
      "type": "ownMsg",
      "msg": msg,
      "senderName": senderName,
      "userId": widget.userId
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Docstruct Team'),
        backgroundColor: Colors.black,

      ),
      body: Column(
        children: [
          Expanded(
              child: ListView.builder(
            itemCount: listMsg.length,
            itemBuilder: (context, index) {
              // ownMsg se transmite de forma bidireccional desde el frontend y sendMsgServer desde el backend para otro usuario
              // Revisar backend para mejor información
              if (listMsg[index].type == 'ownMsg') {
                return OwnMsgWidget(
                  msg: listMsg[index].msg,
                  sender: listMsg[index].sender,
                );
              } else {
                return OtherMsgWidget(
                  msg: listMsg[index].msg,
                  sender: listMsg[index].sender,
                );
              }
            },
          )),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 20),
            child: Row(
              children: [
                Expanded(
                    child: TextFormField(
                  controller: _msgController,
                  decoration: InputDecoration(
                      hintText: 'Type here...',
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: const BorderSide(width: 2)),
                      suffixIcon: IconButton(
                        onPressed: () {
                          String msg = _msgController.text;
                          if (msg.isNotEmpty) {
                            sendMsg(_msgController.text, widget.name);
                            _msgController.clear();
                          }
                        },
                        icon: const Icon(
                          Icons.send,
                          color: Colors.teal,
                        ),
                      )),
                )),
              ],
            ),
          )
        ],
      ),
    );
  }
}
