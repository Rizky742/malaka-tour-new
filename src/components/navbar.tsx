/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import LogoMalaka from "@/assets/logo_malaka.png";
import { Menu, XIcon } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();


  const { data: session } = useSession();
  // console.log(session)
  const role = session?.user?.role;

  let menuItems: any[] = [];

  if (session) {
    
    if (role === "admin") {
      menuItems = [
        { name: "Dashboard", url: "/dashboard" },
        // { name: "Layanan", url: "/dashboard/layanan" },
        { name: "Users", url: "/dashboard/users" },
        { name: "Tour Guide", url: "/dashboard/tour-guide" },
        { name: "Maskapai", url: "/dashboard/maskapai" },
        { name: "Paket", url: "/dashboard/paket" },
      ];
    } else if (role === "user") {
      menuItems = [
        { name: "Tabungan", url: "/dashboard" },
        // { name: "Layanan", url: "/dashboard/layanan" },
      ];
    }
  } else {
    menuItems = [
      { name: "Beranda", url: "/" },
      { name: "Paket Layanan", url: "/paket-layanan" },
      { name: "Tentang", url: "/tentang" },
      { name: "Galeri", url: "/galeri" },
    ];
  }
  return (
    <div className="w-full h-25 px-4 md:px-[124px] flex flex-row justify-between py-5 sticky bg-white top-0 z-50 items-center text-black">
      <div className="flex flex-col items-center justify-center">
        {!session?.user && <Image
          src={LogoMalaka.src}
          alt="Logo Malaka Tour Travel"
          width={200}
          height={200}
          className="w-16 md:w-auto"
        />}
        
        <p className="hidden md:block text-sm font-semibold md:text-base text-center">
          {session?.user.name ? `Hi ${session.user.name}`: " Malaka Tour Travel"}
         
        </p>
      </div>
      <div className="hidden space-x-4 md:flex items-center">
        {menuItems.map((menu, index) => (
          <Link key={index} href={menu.url}>
            <button
              className={`cursor-pointer px-3 py-1 transition-all ${
                pathname === menu.url
                  ? "text-blue-500 font-semibold"
                  : "hover:text-blue-500"
              }`}
            >
              {menu.name}
            </button>
          </Link>
        ))}
        {session? (
          <SignOutButton />
        ): (
          <Link href={"/login"}>
        <span className="px-4 py-2 bg-[#44A6D0] text-white cursor-pointer rounded-md text-sm md:text-base">
          Masuk
        </span>
        </Link>
        )} 
        
      </div>
      <button
        className="block cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <XIcon /> : <Menu />}
      </button>
      {menuOpen && (
        <div className="absolute top-20 right-0 w-full h-screen bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-2 md:hidden">
          {menuItems.map((menu, index) => (
            <Link key={index} href={menu.url}>
              <button
                className={`cursor-pointer px-3 py-1 transition-all w-full text-left ${
                  pathname === menu.url
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-500"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {menu.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
