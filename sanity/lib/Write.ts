import "server-only"

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const write = createClient({
  projectId,
  dataset,
  apiVersion: "vX",
  useCdn: false,
  token,
});

if(!write.config().token) {
  throw new Error("Missing token")
}
