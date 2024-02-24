import dynamic from "next/dynamic";
import { getAuthSession } from "@/lib/auth";
import { Spinner } from "@nextui-org/react";
import type { Session } from "next-auth";
const SiteAdminDashboard = dynamic(() => import("./_components/siteAdmin"), {
  loading: () => (
    <div className="flex justify-center align-middle ">
      <Spinner color="primary" />
    </div>
  ),
});
const CompanyAdminDashboard = dynamic(
  () => import("./_components/companyAdmin"),
  {
    loading: () => (
      <div className="flex justify-center align-middle ">
        <Spinner color="primary" />
      </div>
    ),
    ssr: false,
  }
);
const EmployeeDashboard = dynamic(() => import("./_components/employee"), {
  loading: () => (
    <div className="flex justify-center align-middle ">
      <Spinner color="primary" />
    </div>
  ),
});

export default async function Dashboard() {
  const session = (await getAuthSession()) as Session;

  return session.user.role === "employee" || session.user.role === "user" ? (
    <EmployeeDashboard />
  ) : session.user.role === "companyAdmin" ? (
    <div className="p-12 mt-4">
      <CompanyAdminDashboard />
    </div>
  ) : (
    <SiteAdminDashboard />
  );
}
