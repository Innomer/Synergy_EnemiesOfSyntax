"use client";

import NextLink from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils/ui";
import ActiveSectionWrapper from "./hoc";
import { subtitleVariants, titleVariants } from "@/components/Variants";

function HeroSection() {
  return (
    <>
      <div className="h-[50rem] w-full dark:bg-black bg-white transform-gpu dark:bg-dot-[#cce3fd]/[0.2] bg-dot-[#002e62]/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
            }}
            className="inline-block md:max-w-3xl lg:max-w-6xl text-center justify-center"
          >
            <h1 className={cn(titleVariants())}>From&nbsp;</h1>
            <h1 className={titleVariants({ color: "yellow" })}>Chaos&nbsp;</h1>
            <h1 className={cn(titleVariants())}>to&nbsp;</h1>
            <h1 className={titleVariants({ color: "golden" })}>
              Cohesion&nbsp;
            </h1>
            <br />
            <h1 className={cn(titleVariants({}), "block")}>
              Elevate Your&nbsp;
            </h1>
            <h1 className={titleVariants()}>Document Game in Construction.</h1>
            <motion.h2
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.2,
                delay: 0.1,
              }}
              className={subtitleVariants({ class: "mt-4" })}
            >
              Providing Effortless Management, Navigation of Projects,
            </motion.h2>
          </motion.div>
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.25,
              duration: 0.7,
            }}
          >
            <Link
              as={NextLink}
              about="Find out why you should care about us"
              href={"/analytics"}
              className={buttonStyles({
                color: "success",
                radius: "full",
                variant: "shadow",
              })}
            >
              Get started
            </Link>
            <Link
              as={NextLink}
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href="/about"
            >
              Learn More →
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ActiveSectionWrapper(HeroSection, "Home", 0.6);
