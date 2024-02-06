"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/app/_components/ui/button";

export default function NewBlogButton() {
  const params = useParams();
  const session = useSession();
  const router = useRouter();
    console.log(params)
  return (
    <>
      {session.status === "authenticated" && (
        <Button
          className="duration-300 hover:bg-slate-600 dark:hover:bg-slate-300"
          onClick={() => router.push("/blog/new")}
        >
          Create a New Blog Post
        </Button>
      )}
    </>
  );
}
