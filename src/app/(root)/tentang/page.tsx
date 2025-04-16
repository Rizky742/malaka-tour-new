import React from "react";
import BgUmroh from "@/assets/baru.jpg";
import About from "./components/about";
import Visi from "./components/visi";

function page() {
  return (
    <>
      
      <div
        className="h-80 w-full flex flex-col justify-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BgUmroh.src})`,
          backgroundPosition: "center 400px",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-white px-4 md:px-[124px] text-[50px] font-bold">
          Paket Layanan
        </h1>
        <h1 className="text-white  px-4 md:px-[124px] text-[25px] font-medium">
          Paket Layanan MALAKA
        </h1>
      </div>
      <div className="flex flex-col px-4 md:px-[124px]">
        <About />
        <Visi/>
      </div>

   
    </>
  );
}

export default page;
