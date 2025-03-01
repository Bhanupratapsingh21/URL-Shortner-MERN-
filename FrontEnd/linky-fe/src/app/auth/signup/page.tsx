"use client"
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/../public/logo.png";
import ColourfulText from "@/components/ui/colourful-text";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/authSlice";
import { useToast } from "@/hooks/use-toast";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import Link from "next/link";
interface UserSignupResponse {
  id: string
  username: string
  email: string
  accessToken: string
  refreshToken: string
}

import { Loader2 } from "lucide-react";
export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const signUp = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/signup", data);
      if (response.status === 201) {
        const userData = response.data as { data: UserSignupResponse };
        const user = userData.data as UserSignupResponse;
        dispatch(setUser({ ...user, status: true }));
        // saving refreshtoken in the localstorage
        localStorage.setItem("refreshToken", user.refreshToken);
        console.log(userData.data);
        toast({
          title: "Welcome To Linky",
          description: "Your account has been created successfully",
        });
        router.push("/dashboard");
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error: unknown) {
      console.log(error);
      if (isAxiosError(error as any) && (error as any).response) {
        toast({
          title: "Signup Failed",
          description: (error as any).response.data.message || "Please check your information and try again",
          variant: "destructive"
        });
      } else {
        toast({
          title: "An error occurred",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black px-16 bg-dot-white/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col px-16 py-4 md:flex-row items-center h-screen">
          <div className="h-full w-full flex items-center justify-center">
            <div className="flex items-center justify-center"></div>
            <div className="flex flex-col items-center justify-center">
              <Image
                className="cursor-pointer h-20 w-20 relative z-10"
                src={logo}
                alt="Linky Logo"
                width={80}
                height={80}
              />
              <p className="text-3xl sm:text-4xl font-bold text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-2">
                Join Linky Today
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center mt-4">
            <div
              className="relative w-96 px-2 md:px-4 py-4 bg-white mx-8 shadow rounded-3xl sm:p-10"
            >
              <div className="max-w-md mx-auto">
                <div className="flex items-center text-black text-3xl space-x-3 justify-center">
                  <ColourfulText text="Sign Up" />
                </div>
                <div className="mt-5">
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >Username</label>
                  <input
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                    className="border text-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="text"
                    id="username"
                  />
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >E-mail</label>
                  <input
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="border text-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="email"
                    id="email"
                  />
                  <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                  >Password</label>
                  <input
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    className="border  text-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="password"
                    id="password"
                  />
                </div>
                <div className="mt-5">
                  <button
                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 flex items-center justify-center focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    onClick={signUp}
                  >
                    {loading ? <Loader2 className="animate-spin-fast" /> : "Sign Up"}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  <Link
                    className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    href="/auth/signin"
                  >or sign In
                  </Link>
                  <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}