import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { Startup_view } from "@/sanity/lib/query";
import { write } from "@/sanity/lib/Write";
import { unstable_after as after } from 'next/server'
const View = async ({ id }: { id: string }) => {
  const { views: startuupviewa } = await client
    .config({ useCdn: false })
    .fetch(Startup_view, {id});
after(
  async()=>{
    await write
      .patch(id)
      .set({ views: startuupviewa + 1 })
      .commit();

  })
  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className=" -top-2 absolute -right-0  ">
        <Ping />
      </div>
      <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize">
        <span className="  font-bold ">
          {startuupviewa > 10 ? "Views " : "View "}
          {startuupviewa}
        </span>
      </p>
    </div>
  );
};

export default View;
