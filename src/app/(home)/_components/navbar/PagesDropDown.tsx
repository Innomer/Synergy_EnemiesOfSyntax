"use client";

import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button, ButtonGroup } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/link";
import { Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/ui";
import { navbarLinksForDashboardEmployee } from "@/components/NavLinks";

export default function PagesDropDown() {
  const [isDropDownOpen, setisDropDownOpen] = useState(false);
  const router = useRouter();

  return (
    <ButtonGroup variant="flat">
      <Link
        href="/dashboard"
        className={cn(
          buttonStyles({
            variant: "flat",
          }),
          "rounded-tr-none rounded-br-none"
        )}
      >
        Dashboard
      </Link>
      <Dropdown
        className="hidden md:flex"
        showArrow
        isOpen={isDropDownOpen}
        onOpenChange={(isOpen: boolean) => setisDropDownOpen(isOpen)}
      >
        <DropdownTrigger>
          <Button isIconOnly>
            <Paperclip
              className={`transition-transform ${
                isDropDownOpen ? "rotate-0" : "rotate-90"
              }`}
            />
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownSection>
            {navbarLinksForDashboardEmployee.map((page) => (
              <DropdownItem
                key={page.title}
                // description={page.description}
                // startContent={page.icon}
                onClick={() => router.push(page.href)}
              >
                {page.title}
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
