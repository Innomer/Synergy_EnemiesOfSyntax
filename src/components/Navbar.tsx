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
import NextLink from "next/link";
import type { Session } from "next-auth";

import UserDropdown from "./UserDropdown";
import ColorModeSwitchButton from "./ColorModeSwitchButton";
import { getAuthSession } from "@/lib/auth";
import {
  navbarLinksForDashboardAdmin,
  navbarLinksForDashboardEmployee,
} from "./NavLinks";
import { siteConfig } from "@/lib/config/siteConfig";
import SearchButton from "@/app/(home)/_components/navbar/SearchButton";

export default async function Navbar() {
  const auth = (await getAuthSession()) as Session;

  return (
    <NextUINavbar maxWidth="full" position="sticky" aria-selected isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit mr-6">
          <NextLink
            className="flex justify-start items-center gap-x-2"
            href="/"
          >
            {siteConfig.logo}
            <p className="font-bold text-inherit text-lg uppercase">
              {siteConfig.name}
            </p>
          </NextLink>
        </NavbarBrand>
        <NavbarMenuItem>
          <SearchButton />
        </NavbarMenuItem>

        <NavbarContent className="hidden md:flex">
          {auth.user.role === "admin" &&
            navbarLinksForDashboardAdmin.map((navbarLink, index) => (
              <NavbarItem key={index}>
                <Link
                  color="foreground"
                  key={navbarLink.title}
                  href={navbarLink.href}
                >
                  {navbarLink.title}
                </Link>
              </NavbarItem>
            ))}
          {auth.user.role === "user" &&
            navbarLinksForDashboardEmployee.map((navbarLink, index) => (
              <NavbarItem key={index}>
                <Link
                  color="foreground"
                  key={navbarLink.title}
                  href={navbarLink.href}
                >
                  {navbarLink.title}
                </Link>
              </NavbarItem>
            ))}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarItem>
          <NavbarMenuToggle />
        </NavbarItem>
        <NavbarItem>
          <ColorModeSwitchButton />
        </NavbarItem>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ColorModeSwitchButton />
        </NavbarItem>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {auth.user.role === "admin" &&
          navbarLinksForDashboardAdmin.map((navbarLink, index) => (
            <NavbarMenuItem key={`${index}`}>
              <Link href={navbarLink.href} size="lg">
                {navbarLink.title}
              </Link>
            </NavbarMenuItem>
          ))}
        {auth.user.role === "user" &&
          navbarLinksForDashboardEmployee.map((navbarLink, index) => (
            <NavbarMenuItem key={`${index}`}>
              <Link href={navbarLink.href} size="lg">
                {navbarLink.title}
              </Link>
            </NavbarMenuItem>
          ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}
