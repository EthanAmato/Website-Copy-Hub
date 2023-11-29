import { z } from "zod";
import { env } from "~/env.mjs";
import { BlobServiceClient } from "@azure/storage-blob";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const blogRouter = createTRPCRouter({
  getBlogNames: publicProcedure.query(async () => {
    const sasUrl = env.BLOG_SAS_CONTAINER_URL;

    const blobServiceClient = new BlobServiceClient(sasUrl);
    const containerName = "sitecopycontainer";
    const directoryName = "";

    const containerClient = blobServiceClient.getContainerClient(containerName);

    let blobs = [];
    for await (const blob of containerClient.listBlobsFlat({
      prefix: directoryName,
    })) {
      blobs.push(blob.name);
    }

    // Fetch and return content of each blob (Markdown file)
    let blogPosts = [];
    for (const blobName of blobs) {
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const downloadBlockBlobResponse = await blockBlobClient.download(0);

      const content = await streamToString(
        downloadBlockBlobResponse.readableStreamBody,
      );
      blogPosts.push({ name: blobName, content });
    }

    return blogPosts;
  }),
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
