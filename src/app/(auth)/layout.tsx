//third party
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

//components
import Navbar from "./_components/Navbar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
