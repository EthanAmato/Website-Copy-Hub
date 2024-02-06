"use client";

import React, { ReactNode, useRef, useState } from "react";
import { Button } from "~/app/_components/ui/button";
import Markdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";

export default function NewPost() {
  const markdown = "# Hi, *Pluto*!";
  const [blogPostText, setBlogPostText] = useState<string>();
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black">
      <header className="bg-blue-600 py-6 text-center dark:bg-slate-700">
        <h1 className="text-center text-4xl font-bold text-white">
          New Blog Post
        </h1>
      </header>
      <section className="h-full p-4 md:p-8">
        <textarea
          className="h-[60vh] w-full resize-none rounded-md border border-gray-300 bg-white p-4 shadow-sm outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          placeholder="Start typing..."
          onChange={(e) => setBlogPostText(e.target.value)}
        />
      </section>
      <section className="m-auto flex flex-col justify-between md:w-3/12 md:flex-row">
        <Dialog>
          <DialogTrigger>
            {/* <Button variant={"warning"} size={"xl"}> */}
              Preview...
            {/* </Button> */}
          </DialogTrigger>
          <DialogContent>
            <Markdown>{blogPostText}</Markdown>
          </DialogContent>
        </Dialog>

        <Button variant={"blue"} size={"xl"}>
          Post
        </Button>
      </section>
    </main>
  );
}
