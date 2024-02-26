"use client";
import useSetActiveSectionHook from "@/hooks/useSetActiveSectionHook";
import type { NavLinksDisplayedOnHomePage } from "@/components/NavLinks";
import type { FC } from "react";

export default function ActionSectionWrapper(
  ToBeWrappedComponent: FC,
  sectionName: NavLinksDisplayedOnHomePage,
  threshold: number
) {
  return function WithActiveSectionComponent() {
    const { ref } = useSetActiveSectionHook(sectionName, threshold);

    return (
      <div ref={ref}>
        <ToBeWrappedComponent />
      </div>
    );
  };
}
