import { Input } from "@nextui-org/input";
import SiteAdminForm from "./SiteAdminForm";

export default function SiteAdminDashboard() {
  return (
    <div className="w-full flex overflow-hidden">
      <section className="px-4 py-12 mx-auto max-w-lg mt-28 md:max-w-xl lg:max-w-7xl sm:px-16 md:px-12 lg:px-24 lg:py-24">
        <div className="justify-center p-14 pt-10 bg-stone-300 dark:bg-stone-900 mx-auto text-left align-bottom transition-all transform group rounded-xl sm:align-middle ">
          <h1 className="text-5xl text-center mb-6 dark:from-[#00b7fa] dark:to-[#01cfea] from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground">
            Enter company data
          </h1>
          <div className="grid grid-cols-2 gap-5 mb-8">
            <Input label="name" />
            <Input label="email" />
            <Input label="description" />
            <Input label="website" />
            <Input label="address" />
            <Input label="phone" />
            <Input label="email" />
            <Input label="industry" />
            <Input label="totalRevenue" />
            <Input label="revenueFromUs" />
            <Input label="stockPrice" />
            <Input label="numberOfRetirementPlans" />
          </div>
        </div>
        <SiteAdminForm />
      </section>
    </div>
  );
}
