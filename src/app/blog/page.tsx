import { Metadata } from "next";
import Link from "next/link";
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
  const blogPostsMeta = await api.blog.getBlogMetadata.query();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black">
      <header className="bg-blue-600 py-6 dark:bg-slate-700">
        <h1 className="text-center text-4xl font-bold text-white">
          Check out My Most Recent Blog Posts
        </h1>
      </header>
      <section className="container mx-auto px-4 py-8 md:px-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPostsMeta.map((post) => (
            <div
              className="flex flex-col overflow-hidden rounded-xl border-white bg-white  shadow-lg dark:border dark:bg-black dark:shadow-white"
              key={post.id}
            >
              {/* Optional: Include an image if your posts have thumbnails */}
              {/* <img src={post.meta.thumbnail} alt={post.meta.title} className="w-full h-48 object-cover" /> */}

            <Link href={`/blog/${post.id}`} className="hover:bg-slate-400 dark:hover:bg-slate-700 h-full group transition-colors duration-500">
              <div className="p-4">
                <p className="mb-2 rounded-lg p-2 text-xl font-semibold text-gray-800 dark:bg-slate-600 dark:text-white group-hover:text-white transition-colors duration-500">
                  {post.title}
                </p>
                <p className="text-gray-600 dark:text-white group-hover:text-slate-200 duration-500 transition-colors">
                  {post.description}
                </p>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
