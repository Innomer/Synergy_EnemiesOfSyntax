import type { SelectChat } from "@/lib/db/schema/chats";
import { cn } from "@/lib/utils/ui";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";

type ChatSidebarProps = {
  chats: SelectChat[];
  chatId?: number;
  isPro?: boolean;
};

export default function ChatSidebar({
  chats,
  chatId,
  isPro = false,
}: ChatSidebarProps) {
  return (
    <div className="w-full h-screen overflow-auto p-4 bg-stone-200 dark:bg-stone-600">
      <Link href="/">
        <Button fullWidth color="success">
          <PlusCircle />
          New Chat
        </Button>
      </Link>
      <Divider className="mt-6" />
      <div className="flex max-h-screen overflow-auto pb-20 flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chatbot`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-primary text-white": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.topic}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
