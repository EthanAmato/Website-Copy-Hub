import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import containerClient from "~/server/db/blogClient";
import { randomUUID } from "crypto";

const BlogPostMetaDataSchema = z.object({
  id: z.string().optional(), // ID is optional
  title: z.string(),
  description: z.string(),
});

const BlogPostDataSchema = z.object({
  body: z.string(),
});
const BlogPostSchema = BlogPostMetaDataSchema.merge(BlogPostDataSchema);

export const blogRouter = createTRPCRouter({
  getBlogMetadata: publicProcedure.query(async () => {
    const blobs = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      const properties = await containerClient
        .getBlockBlobClient(blob.name)
        .getProperties();
      if (properties.metadata) {
        try {
          // Use Zod schema to parse and validate the metadata
          const metadata = BlogPostMetaDataSchema.parse(properties.metadata);

          blobs.push({
            id: metadata.id,
            title: metadata.title,
            description: metadata.description,
          });
        } catch (error) {
          console.error("Invalid blog post metadata:", error);
          // Handle invalid metadata case, e.g., skip this blob or log an error
        }
      }
    }

    return blobs;
  }),
  getBlogById: publicProcedure
    .input(z.string().min(1))
    .query(async ({ input }) => {
      for await (const blob of containerClient.listBlobsFlat()) {
        const properties = await containerClient
          .getBlockBlobClient(blob.name)
          .getProperties();
        if (properties.metadata && properties.metadata.id === input) {
          // Blob found with matching ID in metadata
          const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
          const downloadBlockBlobResponse = await blockBlobClient.download(0);
          const content = (await streamToString(
            downloadBlockBlobResponse.readableStreamBody,
          )) as string;
          return content;
        }
      }
      throw new Error("Blog post not found");
    }),

  deleteBlogById: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ input }) => {
      for await (const blob of containerClient.listBlobsFlat()) {
        const properties = await containerClient
          .getBlockBlobClient(blob.name)
          .getProperties();
        if (properties.metadata && properties.metadata.id === input) {
          // Blob found with matching ID in metadata
          const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
          const deleteResponse = await blockBlobClient.deleteIfExists();
          return deleteResponse;
        }
      }
      throw new Error("Blog post not found");
    }),

  postNewBlog: protectedProcedure
    .input(
      z.object({
        data: BlogPostSchema, // Use the Zod schema for validation
      }),
    )
    .mutation(async ({ input }) => {
      // `input.data` is now fully validated as a BlogPost
      const { title, description, body } = input.data;
      const newId = randomUUID();

      const fileName = `blog-${Date.now()}.md`;
      const markdownContent = body;
      const metadata = {
        title: title,
        description: description,
        id: newId,
      };
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      try {
        await blockBlobClient.upload(
          markdownContent,
          Buffer.byteLength(markdownContent),
          {
            metadata: metadata,
          },
        );

        // return success response or blob info as needed
        return {
          success: true,
          message: `Blog Post Saved Successfully`,
          blobName: fileName,
          metadata: metadata,
        };
      } catch (e) {
        console.error(`Error uploading blob: ${(e as Error).message}`);
        throw new Error("Failed to save Blog Post");
      }
    }),
});

// Helper function to read a readable stream into a string
/* eslint-disable */
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
/* eslint-disable  */
