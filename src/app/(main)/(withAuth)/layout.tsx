//third party
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

//components
import Navbar from "@/components/Navbar";
import { Cmdk } from "@/app/(home)/_components/navbar/cmdk";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <>
      <Navbar />
      <Cmdk />
      <main>
        <AntdRegistry>{children}</AntdRegistry>
      </main>
    </>
  );
}
