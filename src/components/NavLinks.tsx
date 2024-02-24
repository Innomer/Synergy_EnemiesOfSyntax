export type NavLinksDisplayedOnHomePage =
  (typeof navbarLinksForHome)[number]["title"];
export const navbarLinksForHome = [
  {
    title: "Home",
    href: "#",
    key: "home",
  },
  {
    title: "About",
    href: "#about",
    key: "about",
  },
  {
    title: "FAQ",
    href: "#faq",
    key: "faq",
  },
  {
    title: "Pricing",
    href: "#pricing",
    key: "pricing",
  },
] as const;

export const navLinksForAuth = [
  {
    title: "About us",
    href: "/about",
    description: "Get to know us better",
  },
  {
    title: "Login",
    href: "/login",
    description: "Login to your account",
  },
  {
    title: "Signup",
    href: "/sign-up",
    description: "Get started with a free account",
  },
];
export type NavbarLinksForAuthType = (typeof navLinksForAuth)[number]["title"];

export const navbarLinksForDashboardAdmin = [
  {
    title: "Chatbot",
    href: "/chatbot",
  },
  {
    title: "Company",
    href: "/company",
  },
  {
    title: "Retirement Calculator",
    href: "/retirement-calculator",
  },
] as const;
export type NavbarLinksForDashboardAdminType =
  (typeof navbarLinksForDashboardAdmin)[number]["title"];

export const navbarLinksForDashboardEmployee = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Chatbot",
    href: "/chatbot",
  },
  {
    title: "Retirement Calculator",
    href: "/retirement-calculator",
  },
] as const;
export type NavbarLinksForDashboardEmployeeType =
  (typeof navbarLinksForDashboardEmployee)[number]["title"];

export const navLinksForTimepassPages = [
  {
    title: "Retirement Calculator",
    href: "/calculator",
  },
] as const;
export type NavLinksForTimepassPagesType =
  (typeof navLinksForTimepassPages)[number]["title"];
