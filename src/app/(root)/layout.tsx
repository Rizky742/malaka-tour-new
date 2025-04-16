import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export  default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
        const session = await auth()
      
        if(session) redirect('/dashboard')
    return (
      <>
      <Navbar   />
      {children}
      <Footer />
      </>
    );
  }