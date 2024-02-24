"use client";

import React, { useState } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

import { ChevronUp, Heart } from "lucide-react";

export default function SponsorsDropDown() {
  const [isDropDownOpen, setisDropDownOpen] = useState(false);

  return (
    <Dropdown
      className="hidden md:flex"
      showArrow
      isOpen={isDropDownOpen}
      onOpenChange={(isOpen: boolean) => setisDropDownOpen(isOpen)}
    >
      <DropdownTrigger>
        <Button
          disableRipple
          variant="solid"
          startContent={<Heart className={` text-danger-500 `} />}
          endContent={
            <>
              <ChevronUp
                className={`transition-transform ${
                  isDropDownOpen ? "rotate-0" : "rotate-180"
                }`}
              />
            </>
          }
        >
          Sponsor
        </Button>
      </DropdownTrigger>

      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection
          title="Subscription Plans"
          classNames={{
            group: "flex flex-row",
            heading: "font-bold text-md",
            base: "mb-0",
          }}
        >
          <DropdownItem key="1" description="Get ALL premium features">
            Gold 🥇
          </DropdownItem>
          <DropdownItem key="2" description="Get most premium features">
            Silver 🥈
          </DropdownItem>
          <DropdownItem key="3" description="Get select premiun features">
            Bronze 🥉
          </DropdownItem>
        </DropdownSection>

        <DropdownSection
          title="FREEE!!"
          classNames={{
            group: "flex flex-row",
            heading: "font-bold text-md",
          }}
        >
          <DropdownItem
            key="4"
            color="success"
            description="Get a taste of what's to come!"
          >
            30-day Trial
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
