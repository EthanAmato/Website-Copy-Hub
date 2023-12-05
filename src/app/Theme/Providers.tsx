"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        enableSystem={true}
        attribute="class"
        defaultTheme="system"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
