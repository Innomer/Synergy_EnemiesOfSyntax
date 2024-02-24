//third party
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

//components
import Navbar from "@/components/Navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
