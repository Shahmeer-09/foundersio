"use server";

import { auth, signOut, signIn } from "@/auth";
import { NextResponse } from "next/server";
import { write } from "@/sanity/lib/Write";
var slugify = require("slugify");
export const createPitch = async (
  prevState: unknown,
  formData: FormData,
  pitch: string
) => {
  const session = await auth();
  if (!session) {
    return {
      msg: "You must be logged in to create a pitch",
      status: "Error",
      data: "",
    };
  }

  const startupdata = {
    title: formData.get("title"),
    description: formData.get("description"),
    author: session.user.id,
    image: formData.get("link"),
    category: formData.get("category"),
    pitch: pitch,
  };

  const slug = slugify(startupdata.title, {
    lower: true,
    strict: true,
  });
  try {
    const result = await write.create({
      _type: "startup",
      title: startupdata.title,
      description: startupdata.description,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: startupdata.author,
      },
      image: startupdata.image,
      category: startupdata.category,
      pitch: startupdata.pitch,
    });
    if (result) {
      return {
        msg: "Pitch created successfully",
        status: "Success",
        data: JSON.parse(JSON.stringify(result._id)),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      msg: "something went wrong",
      status: "Error",
    };
  }
};

export const signout = async () => {
  return await signOut({ redirectTo: "/" });
};
export const siginto = async () => {
  return await signIn();
};
