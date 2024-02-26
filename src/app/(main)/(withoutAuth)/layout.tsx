//components
import Navbar from "@/components/Navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Navbar />
      <main className="mt-10">{children}</main>
    </>
  );
}
