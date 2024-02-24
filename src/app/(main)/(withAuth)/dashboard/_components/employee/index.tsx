import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  employee,
  type SelectEmployee,
} from "@/lib/db/schema/roleBased/employees";
import { eq } from "drizzle-orm";
import type { Session } from "next-auth";
import EmployeeForm from "./EmployeeForm";
import EmployeeData from "./EmployeeData";

export default async function EmployeeDashboard() {
  const session = (await getAuthSession()) as Session;
  const Currentemployee = (
    await db.select().from(employee).where(eq(employee.userId, session.user.id))
  )[0];

  return Currentemployee?.status !== "approved" ? (
    <div className="w-full flex overflow-hidden">
      <section className="px-4 py-12 mx-auto max-w-lg mt-28 md:max-w-xl lg:max-w-7xl sm:px-16 md:px-12 lg:px-24 lg:py-24">
        <div className="justify-center relative p-14 pt-10 overflow-hidden rounded-3xl border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-950 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.7)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-2xl dark:shadow-zinc-900 hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
          <h1 className="text-5xl text-center mb-6 dark:from-[#00b7fa] dark:to-[#01cfea] from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground">
            Lets connect you with your company!
          </h1>
          <EmployeeForm />
        </div>
      </section>
    </div>
  ) : (
    <EmployeeData Employee={Currentemployee} />
  );
}
