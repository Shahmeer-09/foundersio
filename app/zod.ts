import { z } from "zod";

export const CATEGORIES = {
  AI: "ai/ml",
  DEV: "dev",
  APP: "appdev",
  SOCIAL: "social",
  ROBOTICS: "robotics",
  OTHER: "other",
} as const;

export const pitcForm = z.object({
  title: z.string().min(4).max(20),
  description: z.string().min(8).max(100),
  link: z.string().refine(async (val) => {
    const res = await fetch(val, {
      method: "HEAD",
    });
    const url = res.headers.get("content-type");
    return url?.startsWith("image/");
  }),
  category: z.enum([
    CATEGORIES.AI,
    CATEGORIES.APP,
    CATEGORIES.DEV,
    CATEGORIES.OTHER,
    CATEGORIES.ROBOTICS,
    CATEGORIES.SOCIAL,
  ]), // modified line
  pitch: z.string(),
});
