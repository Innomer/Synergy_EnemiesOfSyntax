import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import useActiveSection from "./useActiveSection";
import type { NavLinksDisplayedOnHomePage } from "@/components/NavLinks";

export default function useSetActiveSectionHook(
  sectionName: NavLinksDisplayedOnHomePage,
  threshold: number,
) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSection();
  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 150) {
      setActiveSection(sectionName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return {
    ref,
  };
}
