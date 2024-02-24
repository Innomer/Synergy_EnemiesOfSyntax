"use client";
import type { NavLinksDisplayedOnHomePage } from "@/components/NavLinks";
import { useState, createContext } from "react";

export const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: "Home",
  timeOfLastClick: 0,
  setTimeOfLastClick: () => {},
  setActiveSection: () => {},
});

type ActiveSectionContextType = {
  activeSection: NavLinksDisplayedOnHomePage;
  setActiveSection: React.Dispatch<React.SetStateAction<NavLinksDisplayedOnHomePage>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export default function ActiveSectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] =
    useState<NavLinksDisplayedOnHomePage>("Home");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        setTimeOfLastClick,
        timeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}
