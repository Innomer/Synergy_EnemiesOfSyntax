//third party
import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/react";

//sections
import AboutSection from "./_components/AboutSection";
import HeroSection from "./_components/HeroSection";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MacbookScroll } from "./_components/macbookScroll";
import img from "@/assets/images/aestheticConstruction.webp";

const FAQSection = dynamic(() => import("./_components/FAQSection"), {
  loading: () => (
    <div className="flex justify-center align-middle ">
      <Spinner color="primary" />
    </div>
  ),
  ssr: false,
});
const PricingSection = dynamic(() => import("./_components/PricingSection"), {
  loading: () => (
    <div className="flex justify-center align-middle ">
      <Spinner color="primary" />
    </div>
  ),
  ssr: false,
});

export default async function HomePage() {
  const session = await getAuthSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <div id="hero" className="md:h-[500px] lg:h-[742px] xl:h-screen">
        <HeroSection />
      </div>
      <div id="hero" className="h-[500px] mb-[2000px]">
        <MacbookScroll
          src={"/aestheticConstruction.webp"}
          showGradient
          title="Making your drawings come ALIVE"
        />
      </div>
      <div className="overflow-x-hidden" id="about">
        <AboutSection />
      </div>
      <div className="pb-12" id="faq">
        <FAQSection />
      </div>
      <div className="mb-36 overflow-x-hidden" id="pricing">
        <PricingSection />
      </div>
    </>
  );
}
