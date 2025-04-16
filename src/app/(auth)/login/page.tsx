"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import BgUmroh from "@/assets/login.jpeg";
import LogoMalaka from "@/assets/logo_malaka_baru.png";
import Link from "next/link";
import { useActionState } from "react";
import { signInCredentials } from "@/lib/actions";

export default function SignIn() {
  const [state, formAction] = useActionState(signInCredentials, null);

  const loginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" }, {prompt:"login"});
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left Side with Background */}
      <div
        className="w-[40%] flex flex-col justify-center items-center text-white px-4 md:px-[124px] bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BgUmroh.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-center space-y-2">
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

      {/* Right Side (Form) */}
      <form action={formAction} className="w-[60%] flex flex-col justify-center items-center px-48">
        <p className="text-3xl font-bold text-center">Selamat datang!</p>

        {/* Global Error Message */}
        {state?.message && (
          <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-100 w-full text-center">
            <span className="font-medium">{state.message}</span>
          </div>
        )}

        {/* Email Input */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border-b border-gray-300 p-2 my-2 outline-0 w-full"
        />
        {state?.error?.email && (
          <span className="text-sm text-red-500 mt-1">{state.error.email}</span>
        )}

        {/* Password Input */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border-b border-gray-300 p-2 my-2 outline-0 w-full"
        />
        {state?.error?.password && (
          <span className="text-sm text-red-500 mt-1">{state.error.password}</span>
        )}

        {/* Remember Me */}
        <div className="flex w-full items-center justify-between my-4">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-blue-600 accent-blue-600 focus:ring-0"
            />
            <span>Ingat saya</span>
          </label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-[#44A6D0]">
          Masuk
        </Button>

        {/* Divider */}
        <div className="flex items-center justify-between my-4 w-full">
          <div className="border-b border-gray-300 w-full" />
          <p className="mx-2 text-sm text-gray-700 text-center">Masuk Dengan</p>
          <div className="border-b border-gray-300 w-full" />
        </div>

        {/* Google Sign-in */}
        <button type="button" onClick={loginWithGoogle}>
          <FcGoogle className="w-10 h-10 cursor-pointer" />
        </button>

        {/* Register Link */}
        <p className="text-sm text-gray-700 my-4">
          Belum punya akun?{" "}
          <Link href="/register">
            <span className="text-blue-500 cursor-pointer">Daftar</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
