import chasingAfterMoney from "@/assets/images/chasingMoney.webp";

import { Globe, Star } from "lucide-react";
import Image from "next/image";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";

export default function AboutUsPage() {
  const features = [
    {
      title: "",
      description: "",
    },
  ];

  const CardShine = () => {
    return (
      <div className="relative max-w-xs overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.8)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat p-8 shadow-2xl  hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
        <div className="mb-4">
          <Globe className="h-8 w-8 text-neutral-400" />
        </div>
        <h3 className="mb-2 font-medium tracking-tight text-neutral-100">
          Global Connectivity
        </h3>
        <p className="text-sm text-neutral-400">
          Illuminate your online presence with our enhanced global connectivity
          options.
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-700 lg:bg-transparent overflow-x-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 grid-rows-[auto_1fr] gap-y-16 py-16 md:py-20 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pb-36 lg:py-20 xl:py-32 items-start">
          <div className="relative flex items-end lg:col-span-5 lg:row-span-2">
            <div className="relative z-10 flex w-64 mx-auto overflow-hidden md:w-80 lg:w-auto">
              <Image
                alt="Man chasing after money"
                src={chasingAfterMoney}
                decoding="async"
                data-nimg="future"
                className="object-cover w-full h-1/3 rounded-xl"
              />
            </div>
          </div>
          <div className="relative order-first px-4 sm:px-6 lg:col-span-7 lg:pl-0 lg:pb-14 lg:pr-16 xl:pr-20">
            <div className="hidden lg:absolute lg:bottom-0 lg:-top-32 lg:left-[-100vw] lg:right-[-100vw] lg:block lg:bg-gray-200 dark:bg-zinc-800"></div>

            <figure className="relative max-w-md mx-auto text-center lg:mx-0 lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Star
                        key={index}
                        className="w-5 h-5 fill-current md hydrated text-amber-400"
                        name="star"
                        role="img"
                        aria-label="star"
                      />
                    ))}
                </div>
              </div>
              <blockquote className="mt-2">
                <p className="text-xl font-medium text-black dark:text-white">
                  This product saves me from bankruptcy!”
                </p>
              </blockquote>

              <figcaption className="mt-2 text-sm text-black dark:text-white">
                <strong className="font-semibold text-black dark:text-white before:content-['—_']">
                  Sharukh Khan
                </strong>
                , Actor
              </figcaption>
            </figure>
          </div>
          <div className="pt-16 lg:bg-gray-200 dark:bg-zinc-800 md:dark:bg-gray-700 lg:col-span-7 lg:bg-transparent lg:pt-0 lg:pr-16 xl:pr-20">
            <div className="px-4 mx-auto sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
              <div className="max-w-xl text-center lg:text-left">
                <div>
                  <p className="text-2xl font-thin tracking-tight text-black dark:text-white sm:text-4xl">
                    Do you see yourself frequently chasing money endlessly?
                  </p>
                  <p className="max-w-xl mt-4 text-base tracking-tight text-gray-600 dark:text-white dark:font-light">
                    At Retiral, we are revolutionizing the retirement planning
                    landscape with cutting-edge AI technology. Our mission is to
                    empower individuals to take control of their financial
                    future and embark on a journey toward a secure and
                    prosperous retirement.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row lg:justify-start pb-3">
                  <Link
                    as={NextLink}
                    href={"/login"}
                    className={buttonStyles({
                      color: "success",
                      radius: "full",
                      variant: "shadow",
                    })}
                  >
                    Create a free account now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </>
  );
}
