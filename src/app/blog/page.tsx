import { Metadata } from "next";
import React from "react";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Recent Blog Posts",
  description:
    "A page to find the most recent blogposts posted by Ethan Amato about his web dev journey",
};

/***
 * Page for displaying available and most recent blog posts
 **/
export default async function Blog() {
  const blogPostsMeta = await api.blog.getBlogNames.query();

  return (
    <main className="container min-h-full border rounded-xl">
      <header>
        <h1 className="my-4 text-center text-4xl">
          Check out My Most Recent Blog Posts
        </h1>
      </header>
      <section className="container ">
        {blogPostsMeta.map((post, i) => {
          return (
            <div className="border-2 border-slate-500 p-1 rounded-2xl w-80" key={i}>
              <p className="text-2xl font-bold text-center">{post.meta.title}</p>
              <p className="text-ellipsis overflow-hidden">{post.meta.description}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
