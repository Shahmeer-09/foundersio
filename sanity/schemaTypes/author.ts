import { UserIcon } from "lucide-react";

import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Authors",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "bio",
      type: "string",
    }),
    defineField({
      name: "profilepic",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
