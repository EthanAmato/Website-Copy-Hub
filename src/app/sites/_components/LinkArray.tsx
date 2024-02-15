import Link from "next/link";
import React from "react";
import { type SiteData } from "../siteData";

// Change the prop type to expect an object with an `array` key
type LinkArrayProps = {
  array: SiteData[];
  linkArrayTitle: string;
};

export default function LinkArray({ linkArrayTitle, array }: LinkArrayProps) {
  return (
    <>
      <h2 className="mx-auto mb-2 w-fit rounded-md bg-slate-700 px-5 py-2 text-center text-3xl text-white">
        {linkArrayTitle}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {array.map((site) => (
          <div
            className="flex flex-col overflow-hidden rounded-xl border-white bg-white  shadow-lg dark:border dark:bg-black dark:shadow-white"
            key={site.title}
          >
            <Link
              href={`/sites/${site.href}`}
              className="group h-full transition-colors duration-500 hover:bg-slate-400 dark:hover:bg-slate-700"
            >
              <div className="p-4">
                <p className="mb-2 rounded-lg p-2 text-xl font-semibold text-gray-800 transition-colors duration-500 group-hover:text-white dark:bg-slate-600 dark:text-white">
                  {site.title}
                </p>
                <p className="text-gray-600 transition-colors duration-500 group-hover:text-slate-200 dark:text-white">
                  {site.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
