import { Suspense } from "react";
import { client } from "@/sanity/lib/client";

import { notFound } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import { Get_editorsPic, Startup_detail } from "@/sanity/lib/query";
import { Author, Startup, Playlist } from "@/sanity/types";
import View from "../../_components/View";
import PostCard from "../../_components/PostCard";

const md = markdownit();
export const experimental_ppr = true;
export type startupType = Omit<Startup, "author"> & { author?: Author };
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const [detail, playlist] = await Promise.all([
    client.fetch(Startup_detail, { id }),
    client.fetch(Get_editorsPic, { slug: "editors-pick" }),
  ]);
  if (!detail) return notFound();
  const parsedContent = md.render(detail?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">
          {new Date(detail._createdAt).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
            day: "numeric",
          })}
        </p>

        <h1 className="heading">{detail.title}</h1>
        <p className="sub-heading !max-w-5xl">{detail.description}</p>
      </section>

      <section className="section_container">
        <img
          src={detail.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/profile/${detail.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={detail?.author?.profilepic as string}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{detail?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{detail?.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{detail?.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />
        {playlist && playlist.select?.length > 0 && (
          <div className=" mx-auto  mx-w-4xl  ">
            <p className=" text-[30px]  font-bold  text-black-100 ">
              Editors pick
            </p>

            <ul className=" mt-7 card_grid-sm ">
              {playlist.select.map((item: startupType, index: number) => (
                <PostCard key={item._id} post={item} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
