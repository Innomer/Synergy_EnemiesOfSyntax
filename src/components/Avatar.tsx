import { getAuthSession } from "@/lib/auth";
import { Avatar } from "@nextui-org/avatar";
import { User2 } from "lucide-react";

export default async function UserAvatar() {
  const session = await getAuthSession();
  return (
    <div className="flex gap-4 items-center">
      <Avatar
        showFallback
        isBordered
        size="sm"
        className="transition-transform flex place-items-center justify-center hover:scale-105"
        src={session?.user.image}
        fallback={<User2 />}
      />
    </div>
  );
}
