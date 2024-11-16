import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { Get_User_byId } from "@/sanity/lib/query";
import { Author } from "@/sanity/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import AuthorStartups, { SkeltonCardAuthor } from "../../_components/AuthorStartups";
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user: Author = await client.fetch(Get_User_byId, { id });
  if (!user) {
    notFound();
  }
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className=" font-extrabold text-[24px] text-center   line-clamp-1 uppercase  ">
              {user?.name}
            </h3>
          </div>
          <Image
            src={user?.profilepic || ""}
            alt={user.name || ""}
            width={220}
            height={220}
            className=" profile_image "
          />
          <p className=" font-extrabold text-[26px] text-white-100  ">
            @{user.username}
          </p>
        </div>
        <div className=" felx flex-1 flex-col lg:mt-10 ">
          <p className="  font-bold text-[24px] ">
            {session?.user.id == id ? "Your" : "All"} startups
          </p>
          <ul className=" card_grid-sm ">
            <Suspense fallback={ <SkeltonCardAuthor/> } >
               <AuthorStartups  id={id}/>
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
