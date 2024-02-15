"use client";

import React, { type FormEvent, useState } from "react";
import { Button } from "~/app/_components/ui/button";
import Markdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export default function NewPost() {
  const [blogPostTitle, setBlogPostTitle] = useState<string>("");
  const [blogPostDescription, setBlogPostDescription] = useState<string>("");
  const [blogPostText, setBlogPostText] = useState<string>("");
  const blogPostMutation = api.blog.postNewBlog.useMutation();
  console.log(blogPostMutation);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      blogPostText.length === 0 ||
      blogPostTitle.length === 0 ||
      blogPostDescription.length === 0
    ) {
      toast("Error Submitting your Blog", {
        description: "Please fill out all fields in the form",
      });
      return;
    }

    const blogPostData = {
      data: {
        title: blogPostTitle,
        body: blogPostText,
        description: blogPostDescription,
      },
    };
    blogPostMutation.mutate(blogPostData);
    if (blogPostMutation.data?.success) {
      toast(blogPostMutation.data.message, {
        description: `Post Name: ${blogPostMutation.data.metadata.title},
        File Name: ${blogPostMutation.data.blobName}
        Description: ${blogPostMutation.data.metadata.description}`,
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black">
      <header className="bg-blue-600 py-6 text-center dark:bg-slate-700">
        <h1 className="text-center text-4xl font-bold text-white">
          New Blog Post
        </h1>
      </header>
      <section className="h-full p-4 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <label
              className="ml-2 text-center text-xl font-bold sm:text-left"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              className="w-fit rounded-md border border-gray-300 p-4 text-2xl"
              id="title"
              placeholder="Blog Post Title..."
              onChange={(e) => setBlogPostTitle(e.target.value)}
            />
            <label
              className="ml-2 text-center text-xl font-bold sm:text-left"
              htmlFor="description"
            >
              Description:
            </label>
            <input
              className="w-full rounded-md border border-gray-300 p-4 text-xl sm:w-6/12"
              id="description"
              placeholder="Blog Post Description..."
              onChange={(e) => setBlogPostDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <label
              className="ml-2 text-center text-xl font-bold sm:text-left"
              htmlFor="postMarkdown"
            >
              Blog Post Content (In Markdown Format)
            </label>
            <textarea
              className="h-[50vh] w-full resize-none rounded-md border border-gray-300 bg-white p-4 shadow-sm outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              placeholder="Start typing..."
              id="postMarkdown"
              onChange={(e) => setBlogPostText(e.target.value)}
            />
          </div>
          <div className="m-auto mt-4 flex flex-col justify-between md:w-3/12 md:flex-row">
            <Dialog>
              <DialogTrigger>
                <div className="rounded-md bg-orange-700 px-4 py-3 text-2xl text-white transition-colors duration-300 hover:bg-orange-400 hover:text-slate-600">
                  Preview...
                </div>
              </DialogTrigger>
              <DialogContent>
                <Markdown>{blogPostText}</Markdown>
              </DialogContent>
            </Dialog>

            <Button type="submit" variant={"blue"} size={"xl"}>
              Post
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
