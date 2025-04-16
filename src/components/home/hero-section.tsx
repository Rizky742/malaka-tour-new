/* eslint-disable @next/next/no-img-element */
import React from 'react'
import BgUmroh from "@/assets/gambar_umroh.png";
import LogoMalaka from "@/assets/logo_malaka_baru.png";

export default function HeroSection() {
    return (
        <div
            className="h-[calc(100vh-6.25rem)] w-full justify-center flex overflow-hidden"
            style={{
                backgroundImage: `url(${BgUmroh.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="max-w-3xl flex flex-col items-center justify-center space-y-10">
                <img
                    src={LogoMalaka.src}
                    alt="Logo Malaka Tour Travel"
                    className="w-56 h-56"
                />
                <div>
                    <h1 className="text-white text-3xl font-bold text-center">“Malaka Tour Travel”</h1>
                    <h1 className="text-white text-5xl font-bold text-center">“Siap Melayani Jama’ah ke Tanah Suci Dengan Professional”</h1>
                </div>
            </div>
        </div>
    )
}
