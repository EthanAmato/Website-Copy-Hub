import React from "react";
import Navbar from "../_components/ui/Navbar/navbar";

export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
