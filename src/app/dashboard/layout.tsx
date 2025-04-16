import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
      const session = await auth();

  if (!session) redirect("/login");

  if (session) {
    console.log("session:", session.user);
  }

    return (
      <>
      <Navbar   />
      {children}
      </>
    );
  }