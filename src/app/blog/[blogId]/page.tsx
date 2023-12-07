import { api } from "~/trpc/server";
import Markdown from "react-markdown";

type BlogByIdProps = {
  params: {
    blogId: string;
  };
};

export default async function BlogById({ params }: BlogByIdProps) {
  console.log(params);
  const blogById = await api.blog.getBlogById.query(params.blogId);
  console.log(blogById);
  return (
    <>
      <article className="container">
        <Markdown
          className={
            "prose mx-auto dark:text-white dark:prose-headings:text-white dark:prose-strong:text-white dark:prose-code:text-slate-400 dark:prose-pre:bg-slate-950"           }
        >
          {blogById}
        </Markdown>
      </article>
    </>
  );
}
