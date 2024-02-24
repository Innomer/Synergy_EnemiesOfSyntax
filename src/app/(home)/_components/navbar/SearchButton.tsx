"use client";

import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { isAppleDevice } from "@react-aria/utils";
import { useCmdkStore } from "./cmdk";
import { trackEvent } from "@/lib/utils/vercelAnalytics";

export default function SearchButton() {
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");
  const cmdkStore = useCmdkStore();

  const handleOpenCmdk = () => {
    cmdkStore.onOpen();
    trackEvent("Navbar - Search", {
      name: "navbar - search",
      action: "press",
      category: "cmdk",
    });
  };

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  return (
    <Button
      aria-label="Stock price lookup..."
      className="text-sm font-normal text-default-800 bg-default-400/20 dark:bg-default-500/20"
      endContent={
        <Kbd className="hidden py-0.5 px-2 text-default-600 lg:inline-block" keys={commandKey}>
          K
        </Kbd>
      }
      startContent={
        <Search
          className="text-base text-default-800 pointer-events-none flex-shrink-0"
          size={18}
          strokeWidth={2}
        />
      }
      onPress={handleOpenCmdk}
    >
      Stock price lookup...
    </Button>
  );
}
