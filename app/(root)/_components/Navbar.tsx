"use client";
import { siginto, signout } from "@/app/services/pitchFormaction";
import { auth, signIn, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, PlusCircleIcon } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef, useState } from "react";
const Navbar = ({ session }: { session: any }) => {
  const navbarRef = useRef(null);
  const lastScrollY = useRef(0);
  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      ref={navbarRef}
      className={`px-5 py-3 z-50 shadow-sm bg-white fixed top-0 w-full transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className=" flex justify-between items-center ">
        <Link href={"/"}>
          <Image alt="logo" src="/logo.png" width={150} height={90} />
        </Link>
        <div className=" flex items-center  sm:gap-5 gap-3 ">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className=" text-zinc-800 hidden sm:block ">Create</span>
                <PlusCircleIcon className=" sm:hidden  border-black-100 size-6  text-purple-900 " />
              </Link>
              <Form action={signout}>
                <button type="submit" className=" flex items-center ">
                  <span className=" text-zinc-800  sm:block hidden ">
                    Logout
                  </span>
                  <LogOut className="size-6 text-center sm:hidden block  text-purple-900 " />
                </button>
              </Form>
              <Link
                className=" text-zinc-800 "
                href={`/profile/${session.user?.id}`}
              >
                <Avatar>
                  <AvatarImage src={session.user?.image} />
                  <AvatarFallback>
                    {session?.user?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <Form action={siginto}>
              <button type="submit">
                <span className="text-zinc-800 ">Login</span>
              </button>
            </Form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
