import { Skeleton } from "@nextui-org/skeleton";
import { XCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full flex overflow-hidden">
      <section className="px-4 py-12 mx-auto max-w-lg mt-28 md:max-w-xl lg:max-w-7xl sm:px-16 md:px-12 lg:px-24 lg:py-24">
        <div className="justify-center relative p-14 pt-0 overflow-hidden rounded-3xl border border-neutral-300 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.8)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-2xl  hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
          <div className="pt-8 pb-4 flex justify-between">
            <XCircle />
          </div>
          <div>
            <h1 className="text-5xl text-center align-bottom sm:align-middle mb-6 dark:from-[#00b7fa] dark:to-[#01cfea] from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground">
              Enter your data
            </h1>
            <p className="text-lg text-center text-zinc-500 mb-4">
              Dont worry! Your data is safe with us and wont be sold ❤️
            </p>
          </div>
          <div className="mt-10 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <Skeleton className="h-10 rounded-lg w-52" />
            <Skeleton className="h-10 rounded-lg w-52" />
            <Skeleton className="h-10 rounded-lg w-52" />
            <Skeleton className="h-10 rounded-lg w-52" />
            <Skeleton className="h-10 rounded-lg w-52" />
            <Skeleton className="h-10 rounded-lg w-52" />
            <Skeleton className="h-10 rounded-lg w-52" />
            <Skeleton className="h-10 rounded-lg w-52" />
          </div>
        </div>
      </section>
    </div>
  );
}
