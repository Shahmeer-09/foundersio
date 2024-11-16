import { client } from "@/sanity/lib/client";
import { Startup_query_By_AuthorID } from "@/sanity/lib/query";
import { Startup } from "@/sanity/types";
import React from "react";
import PostCard, { PostCardTyp } from "./PostCard";
import { Skeleton } from "@/components/ui/skeleton";

const AuthorStartups = async ({ id }: { id: string }) => {
  const data: Startup[] = await client.withConfig({useCdn:false}).fetch(Startup_query_By_AuthorID, { id });
  return (
    <>
      {data && data.length > 0 ? (
        data.map((startup: any) => (
          <PostCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="nor-result"> no startups to show </p>
      )}
    </>
  );
};

export default AuthorStartups;

export const SkeltonCardAuthor = () => {
  return [0, 1, 2, 3, 4].map((index) => (
    <li key={index} >
      <Skeleton className="startup-card_skeleton" />
    </li>
  ));
};
