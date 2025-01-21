import { createClient } from "@sanity/client";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,
    apiVersion: "2025-01-13",
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  });

export default client;