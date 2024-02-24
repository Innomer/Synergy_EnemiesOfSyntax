"use client";

//third party
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Tab, Tabs } from "@nextui-org/tabs";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/lib/config/siteConfig";
import NextLink from "next/link";
import { useSession } from "next-auth/react";

//components
import ColorModeSwitchButton from "@/components/ColorModeSwitchButton";
import {
  navbarLinksForHome,
  type NavLinksDisplayedOnHomePage,
} from "@/components/NavLinks";
import useActiveSection from "@/hooks/useActiveSection";
import SearchButton from "./SearchButton";
import UserDropdown from "@/components/UserDropdown";

export const Navbar = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection();
  const { data, status } = useSession();

  const handlingManualSectionChange = (
    activeSection: NavLinksDisplayedOnHomePage
  ) => {
    setActiveSection(activeSection);
    setTimeOfLastClick(Date.now());
  };

  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-x-2" href="/">
            {siteConfig.logo}
            <p className="font-bold text-inherit text-lg uppercase">
              {siteConfig.name}
            </p>
          </NextLink>
        </NavbarBrand>

        <NavbarItem className="hidden md:flex ml-10 mr-2">
          <Tabs
            aria-label="Options"
            variant="underlined"
            size="md"
            color="primary"
            classNames={{
              tabList: "gap-[1]",
              tab: "md:px-[10px] lg:px-3",
            }}
            selectedKey={activeSection}
            onSelectionChange={(key: any) => handlingManualSectionChange(key)}
          >
            {navbarLinksForHome.map((navbarLink) => {
              return (
                <Tab
                  as={Link}
                  name={navbarLink.title}
                  aria-label={"Navigate to" + navbarLink.title}
                  key={navbarLink.title}
                  title={navbarLink.title}
                  href={navbarLink.href}
                />
              );
            })}
          </Tabs>
        </NavbarItem>

      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 md:basis-full"
        justify="end"
      >
        <NavbarItem>
          <ColorModeSwitchButton />
        </NavbarItem>
        <NavbarItem>
          {status === "authenticated" ? (
            <UserDropdown />
          ) : (
            <Link href="/login" className={buttonStyles({ variant: "faded" })}>
              Login
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <NavbarItem>
          <NavbarMenuToggle />
        </NavbarItem>
        <NavbarItem>
          <ColorModeSwitchButton />
        </NavbarItem>
        <NavbarItem>
          {status === "authenticated" ? (
            <UserDropdown />
          ) : (
            <Link href="/login" className={buttonStyles({ variant: "faded" })}>
              Login
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navbarLinksForHome.map((navbarLink, index) => (
            <NavbarMenuItem key={`${index}`}>
              <Link
                color={
                  navbarLink.title === activeSection ? "primary" : "foreground"
                }
                href={navbarLink.href}
                size="lg"
              >
                {navbarLink.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
