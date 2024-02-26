import CompanyStats from "./CompanyStats";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "These are certain real time statistics of how we helped grow other companies",
};

export default function AnalystisPage() {
  return (
    <div>
      <div className="flex flex-col mb-16 mt-9 justify-center text-center gap-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-7 xl:text-7xl 2xl::text-8xl font-thin from-[#6FEE8D] to-[#17c964] bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground">
          Why should you partner with us?
        </h1>
        <h3 className="text-3xl md:text-4xl lg:text-5xl  text-zinc-300 ">
          Well, they say stats never lie. So this is why&nbsp;
          <span className="text-zinc-100">Retiral</span> works
        </h3>
      </div>
      <div>
        <CompanyStats />
      </div>
    </div>
  );
}
