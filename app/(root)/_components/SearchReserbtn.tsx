"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchReserbtn = () => {
  const router = useRouter();
  const Reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
   
  };
  return (
    <button onClick={Reset} type="reset"  className="search-btn text-white-100 ">
      <Link href={'/'} >
      <X className=" size-5 " />
      </Link>
    </button>
  );
};

export default SearchReserbtn;
