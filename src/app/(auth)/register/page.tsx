"use client";

import React, { useActionState } from "react";
import BgUmroh from "@/assets/login.jpeg";
import LogoMalaka from "@/assets/logo_malaka_baru.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUpCredentials } from "@/lib/actions";

export default function Page() {
  const [state, formAction] = useActionState(signUpCredentials, null);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[60%] px-48">
        <form action={formAction}>
          <p className="text-3xl font-bold text-center">Buat Akun Baru!</p>
          {state?.message ? (
            <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-100">
              <span className="font-medium">{state?.message}</span>
            </div>
          ) : null}
          <input
            name="name"
            type="text"
            placeholder="Masukkan nama lengkap"
            className="border-b-1 border-gray-300 p-2 my-4 outline-0 w-full"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.name}
            </span>
          </div>
          <input
            name="email"
            type="email"
            placeholder="Masukkan email"
            className="border-b-1 border-gray-300 p-2 my-4 outline-0 w-full"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.email}
            </span>
          </div>
          <input
            name="noHp"
            type="tel"
            placeholder="Masukkan no hp"
            className="border-b-1 border-gray-300 p-2 my-4 outline-0 w-full"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.noHp}
            </span>
          </div>
          <input
            name="password"
            type="password"
            placeholder="Buat kata sandi"
            className="border-b-1 border-gray-300 p-2 my-4 outline-0 w-full"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.password}
            </span>
          </div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Ulangi Kata Sandi"
            className="border-b-1 border-gray-300 p-2 my-4 outline-0 w-full"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.confirmPassword}
            </span>
          </div>
          <div className="flex w-full items-center justify-between my-4">
            <div className="flex items-center space-x-2">
              <input
              required
                // name="tnc"
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 accent-blue-600 focus:ring-0"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Saya Menyetujui{" "}
                <span className="text-blue-500 cursor-pointer">
                  Syarat & Ketentuan Berlaku
                </span>
              </label>
            </div>
          </div>
          {/* <button className="bg-blue-500 text-white rounded-md p-2 w-full">
          Masuk
        </button> */}

          <Button type="submit" className="w-full bg-[#44A6D0]">
            Daftar
          </Button>
        </form>

        <div className="flex items-center justify-between my-4 w-full">
          <div className="border-b border-gray-300 w-full"></div>
          <p className="mx-2 text-sm text-gray-700 w-full text-center">
            Masuk Dengan
          </p>
          <div className="border-b border-gray-300 w-full"></div>
        </div>
        <p className="text-sm text-gray-700 my-4 text-center">
          Sudah punya akun?{" "}
          <Link href={"/login"}>
            <span className="text-blue-500 cursor-pointer">Masuk Disini</span>
          </Link>
        </p>
      </div>
      <div
        className="w-[40%] flex flex-col h-screen items-center justify-center text-white space-y-11"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BgUmroh.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="items-center justify-center flex flex-col space-y-2">
          <img
            src={LogoMalaka.src}
            alt="Logo Malaka Tour Travel"
            className="w-16"
          />
          <p>MALAKA TOUR & TRAVEL</p>
        </div>
        <h1 className="text-4xl font-bold text-center">
          Pengalaman Tak Terlupakan Bersama Malaka Tour Travel
        </h1>
      </div>
    </div>
  );
}
