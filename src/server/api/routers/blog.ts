import { z } from "zod";
import { env } from "~/env.mjs";
import { BlobServiceClient } from "@azure/storage-blob";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import containerClient from "~/server/db/blogClient";
import { randomUUID } from "crypto";

type BlogPostMetaData = {
  id: string;
  title: string;
  description: string;
};

export const blogRouter = createTRPCRouter({
  getBlogMetadata: publicProcedure.query(async () => {

    let blobs = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      const metadata = await (await containerClient.getBlockBlobClient(blob.name).getProperties()).metadata as BlogPostMetaData
      blobs.push({
        id: metadata.id,
        title: metadata.title,
        description: metadata.description
      })
    }

    return blobs;
  }),
  getBlogById: publicProcedure.input(z.string().min(1)).query(async () => {
    // Fetch and return content of each blob (Markdown file)
    let blogPosts = [];
    // for (const blobName of blobs) {
    //   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    //   const downloadBlockBlobResponse = await blockBlobClient.download(0);

    //   const content = await streamToString(
    //     downloadBlockBlobResponse.readableStreamBody,
    //   );
    //   blogPosts.push({
    //     name: blobName,
    //     meta: downloadBlockBlobResponse.metadata as BlogPostMetaData,
    //     content,
    //   });
    }
  ),
});

// Helper function to read a readable stream into a string
async function streamToString(
  readableStream: NodeJS.ReadableStream | undefined,
) {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    readableStream?.on("data", (data: { toString: () => any }) => {
      chunks.push(data.toString());
    });
    readableStream?.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream?.on("error", reject);
  });
}
