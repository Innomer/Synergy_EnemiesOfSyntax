import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CompanyRegistratonForm from "./_components/CompanyRegistratonForm";

export default async function CompanyRegistration() {
  const auth = await getAuthSession();
  if (auth?.user) {
    redirect("/login");
  }
  if (auth?.user.role !== "siteAdmin") {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="flex">Page</div>
    </>
  );
}
