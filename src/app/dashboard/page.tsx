"use client"


import { useSession } from "next-auth/react";
import DashboardUserPage from "./components/userDashboardPage";
import DashboardAdminPage from "./components/AdminDashboardPage";

export default  function Home() {
  const session = useSession();
  return (
    <>
    {session?.data?.user.role == "admin" ? (<DashboardAdminPage />) : (
      <DashboardUserPage />
    )} 
    </>
  );
}
