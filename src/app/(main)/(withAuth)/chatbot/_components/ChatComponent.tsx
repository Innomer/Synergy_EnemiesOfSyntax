"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import axios from "axios";
import { Divider } from "@nextui-org/divider";

export default function ChatComponent() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmitRequest = async () => {
    if (!query) return;
    const resp = await axios.post("/api/messages", { query });

    // setMessages((messages) => [
    //   ...messages,
    //   { text: query, isBot: false, isSending: true },
    // ]);
    setQuery("");
  };
  useEffect(() => {
    async function getMessages() {
      try {
        setLoading(true);
        const resp = await axios.post("/api/messages");
        setMessages(resp.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getMessages();
  }, []);

  return (
    <div className="relative h-[93vh] overflow-clip w-full bg-zinc-200">
      <div className="sticky text-center top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
        <Divider />
      </div>

      <MessageList messages={messages} isLoading={loading} />

      <div className="absolute bottom-0 inset-x-0 px-2 py-4 bg-zinc-200">
        <div className="flex justify-center align-middle">
          <Input
            value={query}
            className="w-[50%] mr-2"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask any question..."
          />
          <Button color="success" variant="solid" className="my-auto">
            <Send className="h-4 w-4" onClick={handleSubmitRequest} />
          </Button>
        </div>
      </div>
    </div>
  );
}
