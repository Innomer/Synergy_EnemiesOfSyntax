import { getAuthSession } from "@/lib/auth";
import ChatComponent from "./_components/ChatComponent";
import ChatSidebar from "./_components/ChatSidebar";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema/chats";
import { eq } from "drizzle-orm";
import type { Session } from "next-auth";

export default async function Chatbot() {
  const session = (await getAuthSession()) as Session;
  const _chats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, session.user.id));
  const currentChat = _chats[0];

  return (
    <div className="flex w-full h-screen ">
      <div className="w-[300px] overflow-y-hidden">
        <ChatSidebar chats={_chats} chatId={currentChat?.id} />
      </div>
      <div className="border-l-2 border-l-slate-200 w-full">
        <ChatComponent />
      </div>
    </div>
  );
}
