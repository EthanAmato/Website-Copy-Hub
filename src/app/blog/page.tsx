import { type Metadata } from "next";
import Link from "next/link";
import React from "react";
import { api } from "~/trpc/server";
import NewBlogButton from "./blogComponents/NewBlogButton";
import DeleteBlogButton from "./blogComponents/DeleteBlogButton";

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

  // const session = await getServerAuthSession();
  
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black">
      <header className="bg-blue-600 py-6 text-center dark:bg-slate-700">
        <h1 className="text-center text-4xl font-bold text-white">
          Check out My Most Recent Blog Posts
        </h1>
      </header>
      <section className="container px-12 py-8 md:mx-10 md:px-0 lg:mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPostsMeta.map((post) => (
            <div
              className="flex flex-col overflow-hidden rounded-xl border-white bg-white  shadow-lg dark:border dark:bg-black dark:shadow-white"
              key={post.id}
            >
              <Link
                href={`/blog/${post.id}`}
                className="group h-full transition-colors duration-500 hover:bg-slate-400 dark:hover:bg-slate-700"
              >
                <div className="p-4">
                  <p className="mb-2 rounded-lg p-2 text-xl font-semibold text-gray-800 transition-colors duration-500 group-hover:text-white dark:bg-slate-600 dark:text-white">
                    {post.title}
                  </p>
                  <p className="text-gray-600 transition-colors duration-500 group-hover:text-slate-200 dark:text-white">
                    {post.description}
                  </p>
                </div>
              </Link>
              
              <DeleteBlogButton postId={post.id!}/>
            </div>
          ))}
        </div>
      </section>
      <footer className="text-center">
        <NewBlogButton />
      </footer>
    </main>
  );
}
