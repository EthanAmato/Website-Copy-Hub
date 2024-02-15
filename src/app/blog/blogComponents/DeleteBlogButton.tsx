"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import React, { useState } from "react"; // Import useState
import { toast } from "sonner";
import { Button } from "~/app/_components/ui/button";
import { DialogHeader, DialogFooter } from "~/app/_components/ui/dialog";
import { api } from "~/trpc/react";

type DeleteBlogButtonProps = {
  postId: string;
};

export default function DeleteBlogButton({ postId }: DeleteBlogButtonProps) {
  const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility
  const deleteById = api.blog.deleteBlogById.useMutation();
  const utils = api.useUtils();

  const handleDelete = async () => {
    await deleteById.mutateAsync(postId); // Assuming mutateAsync is the correct method
    setIsOpen(false); // Close the dialog after deletion
    void (await utils.invalidate());
    toast("Post deleted");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-400 text-black hover:bg-red-700 hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          Delete Post
        </Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30" />
      <DialogContent className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="text-black"
            color="red"
          >
            Delete
          </Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>{" "}
          {/* Directly close the dialog on cancel */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
