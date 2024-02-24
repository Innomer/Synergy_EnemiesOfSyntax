import { useContext } from "react";
import { ActiveSectionContext } from "@/providers/ActiveSectionProvider";

const useActiveSection = () => {
  return useContext(ActiveSectionContext);
};

export default useActiveSection;
