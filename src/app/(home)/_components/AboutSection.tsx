"use client";

import ActiveSectionWrapper from "./hoc";
import HowWeWorkSection from "./howWeWorkSection/HowWeWorkSection";

import { Typewriter } from "react-simple-typewriter";
import { motion, useInView, useAnimation, type Variant } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DotLottiePlayer, PlayerEvents } from "@dotlottie/react-player";
import Lottie from "react-lottie";
import "@dotlottie/react-player/dist/index.css";
import { Divider, Spinner } from "@nextui-org/react";
import Aos from "aos";
import fileSearchingAnimation from "@/assets/videos/fileSearchingAnimation.json";
import { StickyScroll } from "@/components/StickyScrollReveal";

function AboutSection() {
  const [loadingForPiggyBankLottie, setLoadingForPiggyBankLottie] =
    useState(true);
  const typeWriterSentaces = [
    "Stressed about your income?",
    "Thinking about saving money?",
  ];
  useEffect(() => {
    Aos.init({ duration: 1000, once: true, easing: "ease", offset: 60 });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-24">

        <StickyScroll
          content={[
            { description: "LKLF8", title: "fejkyr" },
            { description: "yooo", title: "aasda" },
            { description: "a3242", title: "fsc" },
            { description: "luk", title: "kjdqka" },
            { description: "", title: "" },
          ]}
        />

        <HowWeWorkSection />

        <div className="flex flex-col-reverse md:flex-row justify-evenly align-middle">
          <div className="flex justify-evenly  my-auto text-center md:text-left">
            <AnimatedText
              el="h1"
              text={[
                "We provide efficient",
                "mechanisms for filtering",
                "and searching",
              ]}
              className="text-3xl md:text-5xl"
              once
            />
          </div>
          <div className="sm:order-1 md:order-2">
            <Lottie
              options={{ animationData: fileSearchingAnimation, loop: true }}
            />
          </div>
        </div>
        
      </div>
    </>
  );
}

type AnimatedTextProps = {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once,
  repeatDelay,
  animation = defaultAnimations,
}: AnimatedTextProps) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const show = () => {
      controls.start("visible");
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <Wrapper className={className}>
      <span className="sr-only">{textArray.join(" ")}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
        aria-hidden
      >
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`${line}-${lineIndex}`}>
            {line.split(" ").map((word, wordIndex) => (
              <span className="inline-block" key={`${word}-${wordIndex}`}>
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default ActiveSectionWrapper(AboutSection, "About", 0.3);
