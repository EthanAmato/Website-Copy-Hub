import { BlobServiceClient } from "@azure/storage-blob";
import { env } from "~/env.mjs";

const sasUrl = env.BLOG_SAS_CONTAINER_URL;

const blobServiceClient = new BlobServiceClient(sasUrl);
const containerName = "sitecopycontainer";

const containerClient = blobServiceClient.getContainerClient(containerName);

export default containerClient;