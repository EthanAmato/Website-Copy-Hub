import React from "react";
import Navbar from "../_components/ui/Navbar/navbar";
import LinkArray from "./_components/LinkArray";
import { copySiteData, originalSiteData } from "./siteData";

export default function SiteMenu() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 dark:bg-black">
        <header className="bg-blue-600 py-6 text-center dark:bg-slate-700">
          <h1 className="text-center text-4xl font-bold text-white">
            Browse Some Cool Site Designs That I Developed!
          </h1>
        </header>
        <section className="container px-12 py-8 md:mx-10 md:px-0 lg:mx-auto">
          <LinkArray linkArrayTitle="Original Sites" array={originalSiteData} />
          <LinkArray linkArrayTitle="Copycat Sites" array={copySiteData} />
        </section>
        <footer className="text-center"></footer>
      </main>
    </>
  );
}
