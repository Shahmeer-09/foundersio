import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export type PostCardTyp = Omit<Startup, "author"> & { author?: Partial<Author> };
const PostCard = ({ post }: { post: PostCardTyp }) => {
  const {
    _createdAt,
    author,
    category,
    title,
    image,
    views,
    _id,
    description,
  } = post;
  return (
    <li className=" startup-card  ">
      <div className="  flex-between">
        <p className=" startup-card_date  ">
          {new Date(_createdAt).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
            day: "numeric",
          })}
        </p>
        <div className=" flex gap-1.5 ">
          <Eye className=" size-6 text-primary " />
          <span className=" font-semibold  ">{views}</span>
        </div>
      </div>
      <div className=" flex mt-5 gap-4 ">
        <div className=" flex-1 ">
          <Link href={`/profile/${author?._id}`}>
            <p className=" font-medium  text-[16px] line-clamp-1 ">
              {" "}
              {author?.name}{" "}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <p className=" font-semibold  text-[24px]  "> {title} </p>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.profilepic as string}
            className=" rounded-3xl "
            alt="author"
            height={48}
            width={48}
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className=" text-sm  mt-2 ">{description}</p>
      </Link>
      <Image
        src={image as string ||""}
        alt="post image"
        className="  rounded-lg  object-cover w-full mt-4 h-[170px]  "
      />
      <div className=" flex justify-between items-center mt-3 ">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className=" font-medium text-[16px] ">{category}</p>
        </Link>

        <Button className="startup-card_btnl" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default PostCard;
